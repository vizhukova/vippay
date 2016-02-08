from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class DeleteCategory(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

   # def delete_category(self):
    #    driver = self.driver
     #   category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
      #  category.click()
       # all_categories = driver.find_elements_by_class_name('table-hover')
        #for elem_category in all_categories:
         #   danger_button = elem_category.find_element_by_xpath('../..').find_element_by_class_name('btn-danger')
          #  danger_button.click()

    def test_delete_category(self):

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
            category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
            category.click()

            all_categories = driver.find_elements_by_css_selector('.table-hover tbody>tr')
            for elem_category in all_categories:
                danger_button = elem_category.find_element_by_class_name('btn-danger')
                danger_button.click()
            self.logout()


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
