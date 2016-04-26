from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
import random
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class Active(unittest.TestCase, AuthHelpers, Helpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def new_active(self):
        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")
        wait = WebDriverWait(driver, 10)

        radio = driver.find_elements_by_name('basicCurrency')
        random.choice(radio).click()
        exchange_rates = driver.find_elements_by_tag_name('input')
        new_activ = random.choice(exchange_rates)
        price = self.inorder(100)
        new_activ.send_keys(Keys.BACKSPACE, Keys.BACKSPACE)
        new_activ.send_keys(price)
        button_save_active = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/button[1]')
        button_save_active.click()

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
            active = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[4]/ul/li[1]/a')
            active.click()


            for i in xrange(3):
                self.new_active()
            self.logout()


    def tearDown(self):
        self.driver.close()



if __name__ == '__main__':
    unittest.main()
