from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddCategoryAddProduct(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()


    def add_category(self):

        driver = self.driver
        add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div/div/div[1]/a')
        add_category.click()
        name_input = driver.find_element_by_id('newCategory')
        name1 = self.random_string(8)
        name_input.send_keys(name1)

        button_add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/form/button')
        button_add_category.click()
        driver.find_elements_by_partial_link_text(name1)[0].click()

        #category_href = driver.find_element_by_class_name('category-link')

        #new_category.click()

    def add_product(self):

        driver = self.driver

        add_product = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/div/div/div[1]/a')
        add_product.click()
        elem_name = driver.find_element_by_id('name')
        name2 = self.random_string(5)
        elem_name.send_keys(name2)

        elem_price = driver.find_element_by_id('price')
        price = self.inorder(2)
        elem_price.send_keys(price)
        elem_image = driver.find_element_by_name('image')
        name3 = self.random_string(6)
        elem_image.send_keys(name3)
        elem_product_link = driver.find_element_by_name('product_link')
        name4 = self.random_string(8)
        elem_product_link.send_keys(name4)
        description = driver.find_element_by_id('description')
        name5 = self.random_string(9)
        description.send_keys(name5)
        button_add = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/form/button')
        button_add.click()

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
            self.add_product()
            self.logout()

    def tearDown(self):
        self.driver.close()



if __name__ == '__main__':
    unittest.main()
