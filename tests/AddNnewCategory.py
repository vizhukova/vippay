from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewCategory(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def create_category(self):
        driver = self.driver

        category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
        category.click()
        add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div/div/div[1]/a')
        add_category.click()
        name_input = driver.find_element_by_id('newCategory')
        name = self.random_string(8)
        name_input.send_keys(name)

        button_add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/form/button')
        button_add_category.click()

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
            for i in xrange(3):
                self.create_category()
            self.logout()


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
