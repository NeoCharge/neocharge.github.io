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
    
    userEmail = body['userEmail']
    timeZone = body['timeZone']
    primaryDevice = body['primaryDevice']
    secondaryDevice = body['secondaryDevice']
    deviceID = body['deviceID']
    pushToken = body['pushToken']

    item_count = 0
    
    with connection.cursor() as cur:
        cur.execute('select MAX(UID) as the_max from Users;')
        numEntries = int(cur.fetchall()[0][0])
        if numEntries is None:
            uid = 1
        else:
            uid = numEntries + 1
        if pushToken == "":
            cur.execute("""
                insert into 
                    Users (UID, Email, DevID, PrimDev, SecDev, TimeZone, SmartCharge) 
                values 
                    (
                        %(uid)s, 
                        %(userEmail)s, 
                        %(deviceID)s, 
                        %(primaryDevice)s, 
                        %(secondaryDevice)s, 
                        %(timeZone)s,
                        false
                    )
            """, {
                'uid': str(uid),
                'userEmail': userEmail,
                'deviceID': deviceID,
                'primaryDevice': primaryDevice,
                'secondaryDevice': secondaryDevice,
                'timeZone': timeZone
            })
            #(' + str(uid) + ', "' + userEmail + '", "' + deviceID + '", "' + primaryDevice + '", "' + secondaryDevice + '", "' + timeZone +'");')
        else:
            cur.execute("""
                insert into 
                    Users (UID, Email, DevID, PrimDev, SecDev, TimeZone, PushToken, SmartCharge) 
                values 
                    (
                        %(uid)s, 
                        %(userEmail)s, 
                        %(deviceID)s, 
                        %(primaryDevice)s, 
                        %(secondaryDevice)s, 
                        %(timeZone)s,
                        %(pushToken)s,
                        "false"
                    )
            """, {
                'uid': str(uid),
                'userEmail': userEmail,
                'deviceID': deviceID,
                'primaryDevice': primaryDevice,
                'secondaryDevice': secondaryDevice,
                'timeZone': timeZone,
                'pushToken': pushToken
            })
        connection.commit()
    logger="success"
    return {
        'response': pushToken,
    }
