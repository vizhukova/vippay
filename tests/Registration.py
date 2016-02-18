from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class Registration(unittest.TestCase, Helpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def register(self):
        driver = self.driver

        register = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/ul/li[2]')
        register.click()
        input_login = driver.find_element_by_xpath('//*[@id="login"]')
        name = self.random_string(5)
        input_login.send_keys(name)
        input_name = driver.find_element_by_xpath('//*[@id="full_name"]')
        name = self.random_string(6)
        input_name.send_keys(name)
        input_email = driver.find_element_by_xpath('//*[@id="email"]')
        name = self.random_string(7)
        input_email.send_keys(name)
        input_password = driver.find_element_by_id('password')
        price = self.inorder(3)
        input_password.send_keys(price)
        driver.implicitly_wait(5)
        input_confirm_pass = driver.find_element_by_id('confirm_pass')
        input_confirm_pass.send_keys(price)

        button_send = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/form/div/div[5]')
        button_send.click()
        button_dropdown = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/a')
        button_dropdown.click()
        button_exit = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/ul/li[2]')
        button_exit.click()

    def test_login_logout(self):

        driver = self.driver
        driver.get("http://188.166.116.177")
        driver.implicitly_wait(5)

        for i in xrange(3):
            self.register()


    def tearDown(self):
        self.driver.close()



if __name__ == '__main__':
    unittest.main()
