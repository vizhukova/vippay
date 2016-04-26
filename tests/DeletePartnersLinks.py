from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class DeletePartnersLinks(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def delete_partners_links(self):

        driver = self.driver
        all_links = driver.find_elements_by_css_selector('.table-hover tbody>tr')
        for elem_links in all_links:
            danger_button = elem_links.find_element_by_class_name('glyphicon-remove')
            # btn btn-danger  pull-right  glyphicon-remove
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

            partners_program = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[2]/a')
            partners_program.click()
            partners_links = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[2]/ul/li[3]/a')
            partners_links.click()


            self.delete_partners_links()
            self.logout()


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
