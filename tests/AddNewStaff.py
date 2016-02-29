from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewStaff(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def create_staff(self):

        driver = self.driver
        add_staff= driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/div/div/div/div[1]/a')
        add_staff.click()
        login = driver.find_element_by_id('login')
        name = self.random_string(8)
        login.send_keys(name)
        password  = driver.find_element_by_name('password')
        price = self.inorder(3)
        password.send_keys(price)
        email = driver.find_element_by_name('email')
        name = self.random_string(8)
        email.send_keys(name+'@gmail.com')
        button_add_staff = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/div/button')
        button_add_staff.click()


    def test_login_logout(self):


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
            driver.implicitly_wait(5)

            options_button = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[4]/a')
            options_button.click()
            staff = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[4]/ul/li[4]/a')
            staff.click()


            for i in xrange(2):
                self.create_staff()
            self.logout()


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
