from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class DeleteStaff(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def delete_staff(self):

        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")
        driver.implicitly_wait(5)
        all_staff = driver.find_elements_by_css_selector('.table-hover tbody>tr')
        for elem_category in all_staff:
            danger_button = elem_category.find_element_by_class_name('pull-right')
            #  pull-right  glyphicon-remove
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

            options_button = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[4]/a')
            options_button.click()
            staff = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[4]/ul/li[4]/a')
            staff.click()


            for i in xrange(2):
                self.delete_staff()
            self.logout()


    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()
