import sys
import logging
import rds_config
import pymysql
import json
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

def lambda_handler(event, context):
    deviceID = event["queryStringParameters"]["deviceID"]
    item_count = 0
    
    with connection.cursor() as cur:
        cur.execute('select count(*) as Total from ValidDeviceIds where deviceId = "' + deviceID + '";')
        numDevices = int(cur.fetchall()[0][0])
        connection.commit()
    result=(numDevices > 0)
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(result)
    }
