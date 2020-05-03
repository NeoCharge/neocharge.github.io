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
    token = body['pushToken']
    email = body['userEmail']

    with connection.cursor() as cur:
        cur.execute('SET SQL_SAFE_UPDATES = 0;')
        cur.execute('update Users set PushToken="' + token + '" where Email="' + email + '";')
        connection.commit()
    logger="registered push token " + token + ", user email: " + email
    return {
        'response': logger
    }
