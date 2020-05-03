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

#logger = logging.getLogger()
#logger.setLevel(logging.INFO)
logger=""

try:
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    #logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    #logger.error(e)
    #sys.exit()
    logger="could not connect to the DB"

#logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """
    body = event['body']
    email = body['userEmail']
    startTime = body['startTime']
    endTime = body['endTime']

    with connection.cursor() as cur:
        cur.execute('select * from ChargeSchedule where UID = (select UID from Users where Email="%s");' %email)
        if (cur.rowcount == 0):
            cur.execute('insert into ChargeSchedule (UID, StartTime, EndTime) VALUES ((select UID from Users where Email="%s"), "%s", "%s");' %(email, startTime, endTime))
        else:
            cur.execute('SET SQL_SAFE_UPDATES = 0;')
            cur.execute('update ChargeSchedule set StartTime="%s", EndTime = "%s" where UID = (select UID from Users where Email="%s");' %(startTime, endTime, email))
        connection.commit()
    return {
        'response': 'updated schedule'
    }
