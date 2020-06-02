import sys
import logging
import rds_config
import pymysql
import json
import time

#rds settings
rds_host  = rds_config.rds_host
name = rds_config.rds_username
password = rds_config.rds_password
db_name = rds_config.rds_db_name

logger=""

try:
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger="could not connect to the DB"
    
def handle_time_type(obj):
    if (isinstance(obj, time.time)):
        return obj.__str__()

def lambda_handler(event, context):
    email = event["queryStringParameters"]["userEmail"]
    item_count = 0
    body=json.dumps([])
    with connection.cursor() as cur:
        cur.execute('select StartTime, EndTime from Users inner join ChargeSchedule on (Users.UID = ChargeSchedule.UID) where Email="%s";' %email)
        if (cur.rowcount > 0):
            times = cur.fetchone()
            strTimes = [str(times[0]), str(times[1])]
            connection.commit()
            body=json.dumps(strTimes)
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': body
    }
