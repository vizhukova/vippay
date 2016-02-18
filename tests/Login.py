from NewGeneration import Helpers
from AuthHelpers import AuthHelpers
from selenium import webdriver
import unittest
from selenium.webdriver.common.keys import Keys


class Login(unittest.TestCase, Helpers, AuthHelpers):

    def test_login_logout(self):
        self.driver = webdriver.Firefox()
        driver = self.driver

        mock_user = [


            {
                'driver': 'http://111.vippay.test',
                'email': '111',
                'password': '111'
            },
            {
                'driver': 'http://222.vippay.test',
                'email': '222',
                'password': '222'
            },
            {
                'driver': 'http://333.vippay.test',
                'email': '333',
                'password': '333'
            }

            ]


        for user in mock_user:

            driver = self.driver
            self.login(user)
            self.logout()


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
