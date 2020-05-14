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
    userEmail = event["queryStringParameters"]["userEmail"]
    
    with connection.cursor() as cur:
        cur.execute("set sql_safe_updates = 0;")
        
        # get user's uid to use in next queries
        cur.execute("""
            select UID from Users where Email = %(userEmail)s;
        """, {"userEmail": userEmail})
        connection.commit()
        
        if(cur.rowcount > 0) :
            uid = cur.fetchall()[0][0]
            
            # set device id to not inUse so another account can use it
            cur.execute("""
                update ValidDeviceIds set inUse = 0 
                where exists (
                        select DevID from Users
                        where Users.Email = %(userEmail)s
                        and ValidDeviceIds.deviceID = DevID
                )
            """, {"userEmail": userEmail})
            
            # delete rows in ChargeSchedule referenced by user's uid
            cur.execute("""
                delete from ChargeSchedule
                where UID = %(uid)s
            """, {"uid": uid})
            
            # delete rows in PendingMessages referenced by user's uid
            cur.execute("""
                delete from PendingMessages
                where UID = %(uid)s
            """, {"uid": uid})
            
            # delete user row in Users table
            cur.execute("""
                delete from Users 
                where Email = %(userEmail)s;
            """, {"userEmail": userEmail})
            
            connection.commit()
            
        else:
            # user does not exist
            uid = -1
            
        cur.execute("set sql_safe_updates = 1;")
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(uid)
    }
