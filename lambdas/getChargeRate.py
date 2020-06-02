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

# Minimum Charge Rate
MIN_CHARGE_RATE = 0.0036 # kW, assume anything under 30 mA is not charging

logger=""

try:
    connection = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger="could not connect to the DB"

def lambda_handler(event, context):
    email = event["queryStringParameters"]["userEmail"]
    item_count = 0
    
    with connection.cursor() as cur:
        cur.execute("""
            select PrimDev, PriChargeRate, SecDev, SecChargeRate
            from Users 
            where Email=%(email)s;
        """, { 
            'email': email 
        })
        result = cur.fetchall()[0]
        connection.commit()
        
        # result[1] => Primary Charge Rate
        # result[3] => Secondary Charge Rate
        if result[1] <= MIN_CHARGE_RATE and result[3] > MIN_CHARGE_RATE:
            cur_device = 2
        elif result[3] <= MIN_CHARGE_RATE and result[1] > MIN_CHARGE_RATE:
            cur_device = 1
        elif result[1] > MIN_CHARGE_RATE and result[3] > MIN_CHARGE_RATE:
            cur_device = 3
        else:
            cur_device = 0
        
    tables = {}
    tables["PrimDev"] = result[0]
    tables["PriChargeRate"] = result[1]
    tables["SecDev"] = result[2]
    tables["SecChargeRate"] = result[3]
    tables["CurDevice"] = cur_device
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(tables)
    }
