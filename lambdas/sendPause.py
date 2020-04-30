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
# MSG_SUCCESS = constant
timeout_seconds = 30 

##IMPORTANT: Commented sections of this file are for when devices can confirm recieved message

#should be defaulted to false once the mqtt client listens for success
#pause_success = False
pause_success = True

# 
# def on_message(self, client, userdata, message):
#     msg_str = message.payload.decode("utf-8")
#     msg_obj = json.loads(str(msg_str))
#     if msg_obj["UUID"] == uuid and msg_obj["msg"] == MSG_SUCCESS:
#         pause_success = True

def send_message(topic, msg):
    client = mqtt.Client()
    client.connect(broker_ip, broker_port)
    #client.on_message = on_message
    client.publish(topic, msg)
    # client.loop_start()
    # time.sleep(timeout_seconds)
    # client.loop_stop() 

try:
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger="could not connect to the DB"

def lambda_handler(event, context):
    body = event['body']
    email = body['userEmail']

    with connection.cursor() as cur:
        cur.execute('select DevId, Pause from Users where Email="%s";' %email)
        result = cur.fetchall()[0]
        uuid = result[0]
        is_cur_paused = result[1]

    if is_cur_paused == None:
        is_cur_paused = 0
         
    msg = "{{\"UUID\":\"{}\",\"msg\":{},\"hr_msg\":\"{}\",\"rev\":{},\"time\":{}{}"

    if is_cur_paused: 
        msg = msg.format(uuid, 3, "RESUME_CHARGE", fw, round(time.time()), '}')
    else: 
        msg = msg.format(uuid, 2, "PAUSE_CHARGE", fw, round(time.time()), '}')

    send_message(uuid,msg)

    if pause_success : 
        with connection.cursor() as cur:
            cur.execute('SET SQL_SAFE_UPDATES = 0;')
            cur.execute('Update Users set Pause=%s where Email="%s";' %((not is_cur_paused), email))

    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'json' },
        'body': pause_success
    }
