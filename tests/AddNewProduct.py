from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewProduct(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def new_product(self, new_category):

        driver = self.driver
        new_category.click()
        add_product = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div/div/div[1]/a')
        add_product.click()
        elem_name = driver.find_element_by_id('name')
        name = self.random_string(5)
        elem_name.send_keys(name)

        elem_price = driver.find_element_by_id('price')
        price = self.inorder(3)
        elem_price.send_keys(price)
        elem_image = driver.find_element_by_name('image')
        name = self.random_string(6)
        elem_image.send_keys(name)
        elem_product_link = driver.find_element_by_name('product_link')
        name = self.random_string(8)
        elem_product_link.send_keys(name)
        description = driver.find_element_by_id('description')
        name = self.random_string(9)
        description.send_keys(name)
        button_add = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div[2]/form/button')
        button_add.click()

    def test_add_new_product(self):

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

            all_categories = driver.find_elements_by_class_name('category-link')
            for elem_category in all_categories:
                for i in range(2):
                    self.new_product(elem_category)

            self.logout()


    def tearDown(self):
        self.driver.close()



if __name__ == '__main__':
    unittest.main()
