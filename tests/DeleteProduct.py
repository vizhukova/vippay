from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class DeleteProduct(unittest.TestCase, Helpers, AuthHelpers):
    def setUp(self):
        self.driver = webdriver.Firefox()

    def delete_product(self, elem_category, driver):

        driver.implicitly_wait(5)

        all_products = driver.find_elements_by_css_selector('.table-hover tbody>tr')
        for products in all_products:
            button_delete_product = driver.find_element_by_class_name('btn-danger')
            button_delete_product.click()
            driver.implicitly_wait(5)



    def test_product(self):

        mock_user = [


            {
                'driver': 'http://auth.vippay.info',
                'email': 'luna_tu@TempEMail.net',
                'password': '111'
            }
            # ,
            # {
            #     'driver': 'http://auth.vippay.test',
            #     'email': '222',
            #     'password': '222'
            # },
            # {
            #     'driver': 'http://auth.vippay.test',
            #     'email': '333',
            #     'password': '333'
            # }

            ]

        for user in mock_user:

            driver = self.driver
            self.login(user)
            driver.implicitly_wait(5)
            category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
            category.click()
            all_categories = driver.find_elements_by_class_name('category-link')
            i = 0
            for elem_category in all_categories:
                all_categories = driver.find_elements_by_class_name('category-link')
                all_categories[i].click()


                self.delete_product(elem_category, driver)

                category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
                category.click()
                i += 1



            self.logout()

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()