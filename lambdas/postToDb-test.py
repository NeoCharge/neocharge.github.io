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

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def handler(event, context):
    
    infos = ""
    email = event["queryStringParameters"]["email"]
    
    hasRows = True
    with connection.cursor() as cur:
        cur.execute("""
            select deviceId, chargeLogId, duration, priPower, secPower, eventCode, startTime from ChargeLogs 
                inner join Users on (Users.DevID = ChargeLogs.deviceId) 
            where Email=%(email)s;""",
            { 'email': email })
        time_rows = cur.fetchall()
        if cur.rowcount > 0:
            for row in time_rows:
                infos += str(row)
        else:
            hasRows=False
    connection.commit()
    
    with connection.cursor() as cur:
        cur.execute("""
            select deviceId, chargeLogId, cast(sum(duration) as unsigned) as duration, 
                cast(sum(priPower) as unsigned) as priPower, cast(sum(secPower) as unsigned) as secPower, 
                eventCode, startTime from ChargeLogs inner join Users on (Users.DevID = ChargeLogs.deviceId) 
            where Email=%(email)s group by DATE(startTime);""",
            { 'email': email })
        date_rows = cur.fetchall()
        if cur.rowcount > 0:
            for row in date_rows:
                infos += str(row)
        else:
            hasRows=False
    connection.commit()
    
    with connection.cursor() as cur:
        cur.execute("""
            select deviceId, priPower, secPower, PrimDev, SecDev from ChargeLogs inner join Users on (Users.DevID = ChargeLogs.deviceId) 
            where Email=%(email)s order by startTime desc;""", 
            { 'email': email })
        recent_log_rows = cur.fetchall()
        if len(recent_log_rows) > 0:
            for row in recent_log_rows:
              infos += str(row)
        else:
            hasRows = False
        connection.commit() 
        
    
    tables = {}
    tables["dates"] = date_rows
    tables["times"] = time_rows
    
    def myconverter(o): 
        if isinstance(o, datetime.datetime):
            return "{}-{:02}-{:02}T{:02}:{:02}:{:02}".format(o.year, o.month, o.day, o.hour, o.minute, o.second)


    if (hasRows):
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'json' },
            'body': json.dumps(tables, default=myconverter) 
        }
    else:
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'json' },
            'body': json.dumps(None)
        }
    
