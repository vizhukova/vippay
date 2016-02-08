from NewGeneration import Helpers
from AuthHelpers import AuthHelpers
from selenium import webdriver
import unittest
from selenium.webdriver.common.keys import Keys


class Login(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_login_logout(self):

        mock_users = [
            {
                'email': 'ivan@gmail.com',
                'password': '111'
            },
            {
                'email': 'piter',
                'password': '111'
            },

            {
                'email': 'natali',
                'password': '111'
            }
        ]

        driver = self.driver
        driver.get("http://188.166.116.177")
        driver.implicitly_wait(5)

        for user in mock_users:
            self.login(user)
            self.logout()



    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
