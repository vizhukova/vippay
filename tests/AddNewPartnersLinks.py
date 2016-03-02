from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewPartnerthLinks(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def create_partners_links(self):

        driver = self.driver
        add_partners_links = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/div/div/div/div[1]/a')
        add_partners_links.click()

        name_links = driver.find_element_by_id('name')
        name = self.random_string(8)
        name_links.send_keys(name)
        link = driver.find_element_by_name('link')
        name1 = self.random_string(8)
        link.send_keys(name1)

        key = driver.find_element_by_name('key')
        name2 = self.random_string(8)
        key.send_keys(name2)
        button_add_link = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/form/button')
        button_add_link.click()


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

            partners_program = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[2]/a')
            partners_program.click()
            partners_links = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[2]/ul/li[3]/a')
            partners_links.click()


            for i in xrange(10):
                self.create_partners_links()
            self.logout()


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
