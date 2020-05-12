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

RETRY_DELAY = 2
MAX_RETRIES = 10

##IMPORTANT: Commented sections of this file are for when devices can confirm recieved message

uuid = ''
sent_msg = 0 
msg_success = False

def on_message(self, client, userdata, message):
    msg_str = message.payload.decode("utf-8")
    msg_obj = json.loads(str(msg_str))
    if (msg_obj["UUID"] == uuid and 
            sent_msg == PAUSE_CHARGE and msg_obj["msg"] == PAUSE_ACK or
            sent_msg == RESUME_CHARGE and msg_obj["msg"] == RESUME_ACK):
        msg_success = True

def send_message(topic, msg):
    client = mqtt.Client()
    client.connect(broker_ip, broker_port)
    client.on_message = on_message
    retry_ctr = 0 
    while not msg_success and retry_ctr < MAX_RETRIES: 
        client.publish(topic, msg)
        time.sleep(RETRY_DELAY)

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
        #uuid = result[0]
        #test neocharge device which responds to pause commands
        uuid = "PB2-1"
        is_cur_paused = result[1]

    if is_cur_paused == None:
        is_cur_paused = 0
         
    msg = "{{\"UUID\":\"{}\",\"msg\":{},\"hr_msg\":\"{}\",\"rev\":{},\"time\":{}{}"

    if is_cur_paused: 
        sent_message = RESUME_CHARGE
        msg = msg.format(uuid, RESUME_CHARGE, "RESUME_CHARGE", fw, round(time.time()), '}')
    else: 
        sent_message = PAUSE_CHARGE
        msg = msg.format(uuid, PAUSE_CHARGE, "PAUSE_CHARGE", fw, round(time.time()), '}')

    send_message(uuid,msg)

    if msg_success : 
        with connection.cursor() as cur:
            cur.execute('SET SQL_SAFE_UPDATES = 0;')
            cur.execute('Update Users set Pause=%s where Email="%s";' %((not is_cur_paused), email))

    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'json' },
        'body': {"success" : msg_success, "changedTo" :(not is_cur_paused)}
    }
