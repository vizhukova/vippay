from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddCategoryDeleteCategory(unittest.TestCase,  Helpers, AuthHelpers):

    def setUp(self):

        self.driver = webdriver.Firefox()


    def add_category(self):

        driver = self.driver
        add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div/div/div[1]/a')
        add_category.click()
        name_input = driver.find_element_by_id('newCategory')
        name = self.random_string(8)
        name_input.send_keys(name)

        button_add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/form/button')
        button_add_category.click()
        new_category = driver.find_elements_by_link_text(name)[0]


    def delete_category(self):

        driver = self.driver
        driver.implicitly_wait(5)
        all_categories = driver.find_elements_by_css_selector('.table-hover tbody>tr')
        for elem_category in all_categories:
            danger_button = elem_category.find_element_by_class_name('btn-danger')
            danger_button.click()

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
            category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
            category.click()
            self.add_category()
            self.logout()

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
