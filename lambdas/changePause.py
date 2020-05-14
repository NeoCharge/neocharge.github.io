import paho.mqtt.client as mqtt
import time
import logging
import rds_config
import pymysql
import json

#rds settings
rds_host  = rds_config.rds_host
name = rds_config.rds_username
password = rds_config.rds_password
db_name = rds_config.rds_db_name
#MQTT settings
broker_ip = "52.53.137.231"
broker_port = 1883
fw = 1608
#constants
PAUSE_CHARGE = 2 
PAUSE_ACK = 102
RESUME_CHARGE = 3
RESUME_ACK = 103

RETRY_DELAY = 1
MAX_RETRIES = 5



class ChangePause : 

    def __init__(self, email):
        self.user_email = email
        self.uuid = ''
        self.sent_msg = 0 
        self.msg_success = False
        try:
            self.connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
        except pymysql.MySQLError as e:
            print("could not connect to the DB") 

    def on_message(self, client, userdata, message):
        msg_str = message.payload.decode("utf-8")
        msg_obj = json.loads(str(msg_str))
        if ((msg_obj["UUID"] == self.uuid) and 
                (self.sent_msg == PAUSE_CHARGE and msg_obj["msg"] == PAUSE_ACK) or
                (self.sent_msg == RESUME_CHARGE and msg_obj["msg"] == RESUME_ACK)):
            self.msg_success = True

    def send_message(self,topic, msg):
        client = mqtt.Client()
        client.connect(broker_ip, broker_port)
        client.subscribe("log")
        client.on_message = self.on_message
        client.loop_start()
        retry_ctr = 0 
        while not self.msg_success and retry_ctr < MAX_RETRIES: 
            client.publish(topic, msg)
            time.sleep(RETRY_DELAY)
            retry_ctr+=1
        client.loop_stop()

    def changePause(self):
        with self.connection.cursor() as cur:
            cur.execute('select DevId, Pause from Users where Email="%s";' %self.user_email)
            result = cur.fetchall()[0]
            #until more test devices are available 
            #self.uuid = result[0]
            self.uuid = "PB2-12"
            is_cur_paused = result[1]

        if is_cur_paused == None:
            is_cur_paused = 0
            
        msg = "{{\"UUID\":\"{}\",\"msg\":{},\"hr_msg\":\"{}\",\"rev\":{},\"time\":{}{}"
        #incompatible db format requires single quotes
        sql_msg = "{{'UUID':'{}','msg':{},'hr_msg':'{}','rev':{},'time':{}{}"

        if is_cur_paused: 
            self.sent_msg = RESUME_CHARGE
            msg = msg.format(self.uuid, RESUME_CHARGE, "RESUME_CHARGE", fw, round(time.time()), '}')
            sql_msg = sql_msg.format(self.uuid, RESUME_CHARGE, "RESUME_CHARGE", fw, round(time.time()), '}')
        else: 
            self.sent_msg = PAUSE_CHARGE
            msg = msg.format(self.uuid, PAUSE_CHARGE, "PAUSE_CHARGE", fw, round(time.time()), '}')
            sql_msg = sql_msg.format(self.uuid, PAUSE_CHARGE, "PAUSE_CHARGE", fw, round(time.time()), '}')

        self.send_message(self.uuid,msg)
        
        if self.msg_success : 
            with self.connection.cursor() as cur:
                cur.execute('SET SQL_SAFE_UPDATES = 0;')
                cur.execute('Update Users set Pause=%(setPause)s where Email=%(userEmail)s',
                    {'setPause' : (not is_cur_paused), 'userEmail': self.user_email, })
                cur.execute('SET SQL_SAFE_UPDATES = 1;')
            self.connection.commit()
        else: 
            with self.connection.cursor() as cur:
                cur.execute('select count(*) from PendingMessages where UID="%s"' %self.uuid)
                result = cur.fetchone()
                if(result[0] > 0) :
                    cur.execute('Update PendingMessages set Pause = "%s" where uid = "%s"' %(sql_msg, self.uuid))
                else : 
                    print(msg)
                    cur.execute('Insert into PendingMessages Values("%s","%s", null, null)' %(self.uuid,sql_msg))
            self.connection.commit()


def lambda_handler(event, context):
    body = event['body']
    email = body['userEmail']
    p = ChangePause(email)
    p.changePause()
    
    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'json' },
        'body': {"success" : p.msg_success, "paused" :(p.sent_msg == PAUSE_CHARGE)}
    }
