import unittest
import sys
sys.path.append("..")
import getChargeHistory


class TestStringMethods(unittest.TestCase):

    #check to make sure known user has rows entered
    def test_get_charge_history(self):
        event = {"queryStringParameters" : {"email" : "caseydaly31@gmail.com" }}
        context = {} #not necessary to specify in this test case, but need for the method
        compare_val = {
            'statusCode': 200,
            'headers': { 'Content-Type': 'json' },
            'body': "some_data"
        }
        response = getChargeHistory.lambda_handler(event, context)
        self.assertTrue("statusCode" in response)
        self.assertEqual(compare_val["statusCode"], response["statusCode"])
        self.assertTrue("headers" in response)
        self.assertEqual(compare_val["headers"], response["headers"])


if __name__ == '__main__':
    unittest.main()
