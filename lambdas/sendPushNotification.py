import sys
import logging
import rds_config
import pymysql
import json
from exponent_server_sdk import DeviceNotRegisteredError, PushResponseError, PushServerError
from exponent_server_sdk import PushClient, PushMessage
from requests.exceptions import ConnectionError, HTTPError


# See https://github.com/expo/expo-server-sdk-python for example usage of sending push notifications
# in Python with Expo's push notification service, and where the packages above came from

# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        # Encountered some likely formatting/validation error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'errors': exc.errors,
                'response_data': exc.response_data,
            })
        raise
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        rollbar.report_exc_info(
            extra_data={'token': token, 'message': message, 'extra': extra})
        raise self.retry(exc=exc)

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushResponseError as exc:
        # Encountered some other per-notification error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
        raise self.retry(exc=exc)
        
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
    """
    This function fetches content from MySQL RDS instance
    """
    body = event['body']
        
    #before using them, make sure that deviceID and message can be retrieved without throwing error
    if ((body.get('deviceID') != None) and (body.get('message') != None)):
        deviceID = body['deviceID']
        message = body['message']

        with connection.cursor() as cur:
            cur.execute('select PushToken from Users where DevID = "%s";', deviceID)
            token = cur.fetchall()[0][0]
            connection.commit()
            
        #send the actual push notification itself
        send_push_message(token, message)
        logger="success"
        
        return {
            'response': deviceID
        }
    else:
        return {
            'response': "Could not find deviceID or message in request body."
        }        
