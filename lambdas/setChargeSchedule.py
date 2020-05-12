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
SCHEDULE_UPDATE = 4 
SCHEDULE_UPDATE_ACK = 104

RETRY_DELAY = 1
MAX_RETRIES = 5


class ChangeSchedule : 

    def __init__(self, email):
        self.user_email = email
        self.uuid = ''
        self.msg_success = False
        try:
            self.connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
        except pymysql.MySQLError as e:
            print("could not connect to the DB") 

    def on_message(self, client, userdata, message):
        msg_str = message.payload.decode("utf-8")
        msg_obj = json.loads(str(msg_str))
        if msg_obj["UUID"] == self.uuid and msg_obj["msg"] == SCHEDULE_UPDATE_ACK: 
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

    def sendSchedule(self, startTime, endTime):

        with self.connection.cursor() as cur:
            cur.execute('select DevId, TimeZone from Users where Email="%s";' %self.user_email)
            result = cur.fetchall()[0]
            #until more test devices are available 
            #self.uuid = result[0]
            self.uuid = "PB2-1"
            #TODO -- unknown defs for timezones so using const for now
            #timezone = result[1]
            timezone = "PST8PDT,M3.2.0/2,M11.1.0"

        msg = "{{\"UUID\":\"{}\",\"msg\":{},\"hr_msg\":\"{}\",\"rev\":{},\"time\":{},\"enable\":{},\"startHour\":{},\"startMinute\":{},\"endHour\":{},\"endMinute\":{},\"timezone\":\"{}\"}}"
        sql_msg = "{{'UUID':'{}','msg':{},'hr_msg':'{}','rev':{},'time':{},'enable':{},'startHour':{},'startMinute':{},'endHour':{},'endMinute':{},'timezone':'{}'}}"

        msg = msg.format(self.uuid, SCHEDULE_UPDATE, "SCHEDULE_UPDATE", fw, round(time.time()), "true", startTime, 0, endTime, 0, timezone)

        self.send_message(self.uuid,msg)

        if self.msg_success : 
            with self.connection.cursor() as cur:
                cur.execute('select * from ChargeSchedule where UID = (select UID from Users where Email="%s");' %self.user_email)
                if (cur.rowcount == 0):
                    cur.execute('insert into ChargeSchedule (UID, StartTime, EndTime) VALUES ((select UID from Users where Email="%s"), "%s", "%s");' %(self.user_email, startTime, endTime))
                else:
                    cur.execute('SET SQL_SAFE_UPDATES = 0;')
                    cur.execute('update ChargeSchedule set StartTime="%s", EndTime = "%s" where UID = (select UID from Users where Email="%s");' %(startTime, endTime, self.user_email))
                    ('SET SQL_SAFE_UPDATES = 1;')
                self.connection.commit()
        else: 
            sql_msg = sql_msg.format(self.uuid, SCHEDULE_UPDATE, "SCHEDULE_UPDATE", fw, round(time.time()), "true", startTime, 0, endTime, 0, "PST8PDT,M3.2.0/2,M11.1.0")
            with self.connection.cursor() as cur:
                cur.execute('select count(*) from PendingMessages where UID="%s"' %self.uuid)
                result = cur.fetchone()
                if(result[0] > 0) :
                    cur.execute('Update PendingMessages set Schedule = "%s" where uid = "%s"' %(sql_msg, self.uuid))
                else : 
                    cur.execute('Insert into PendingMessages Values("%s", null, "%s", null)' %(self.uuid, sql_msg))
                self.connection.commit()


def lambda_handler(event, context):
    body = event['body']
    email = body['userEmail']
    startTime = body['startTime']
    endTime = body['endTime']
    p = ChangeSchedule(email)
    p.sendSchedule(startTime,endTime)
    
    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'json' },
        'body': {"success" : p.msg_success}
    }