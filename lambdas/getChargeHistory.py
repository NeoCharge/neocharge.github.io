import sys
import logging
import rds_config
import pymysql
import json
import datetime
#rds settings
rds_host  = rds_config.rds_host
name = rds_config.rds_username
password = rds_config.rds_password
db_name = rds_config.rds_db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5, cursorclass=pymysql.cursors.DictCursor)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
    
def myconverter(o): 
    if isinstance(o, datetime.datetime):
        return "{}-{:02}-{:02}T{:02}:{:02}:{:02}".format(o.year, o.month, o.day, o.hour, o.minute, o.second)

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    infos = ""
    email = event["queryStringParameters"]["email"]
    
    hasRows = True
    with connection.cursor() as cur:
        cur.execute("""
            select deviceId, chargeLogId, duration, priPower, secPower, eventCode, startTime from ChargeLogs
                inner join Users on (Users.DevID = ChargeLogs.deviceId) 
            where Email=%(email)s;""",
            { 'email': email })
        response = cur.fetchall()
        if cur.rowcount < 1:
            hasRows=False
        else:
            #convert to from decimal to float, or else will come back null when serialized
            for row in response:
                row["priPower"]=float(row["priPower"])
                row["secPower"]=float(row["secPower"])
        connection.commit()


    if (hasRows):
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'json' },
            'body': json.dumps(response, default=myconverter) 
        }
    else:
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'json' },
            'body': json.dumps(None)
        }
    
