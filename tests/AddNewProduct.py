from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewProduct(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def new_product(self):

        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")

        add_product = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/div/div/div/div[1]/a')
        add_product.click()
        elem_name = driver.find_element_by_id('name')
        name1 = self.random_string(5)
        elem_name.send_keys(name1)

        elem_price = driver.find_element_by_id('price')
        price = self.inorder(3)
        elem_price.send_keys(price)
        elem_image = driver.find_element_by_name('image')
        name2 = self.random_string(6)
        elem_image.send_keys(name2)
        product_link = driver.find_element_by_id('product_link')
        name = self.random_string(9)
        product_link.send_keys(name)

        description = driver.find_element_by_id('description')
        name3 = self.random_string(9)
        description.send_keys(name3)

        link_download = driver.find_element_by_xpath('//*[@id="link_download"]')
        name4 = self.random_string(9)
        link_download.send_keys(name4)
        print (name, name1, name2, name3, name4)
        button_add = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/form/button')
        # button_add.click()
        driver.implicitly_wait(5)




    def test_add_new_product(self):

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

            all_categories = driver.find_elements_by_class_name('category-link')
            for elem_category in all_categories:
                elem_category.click()
                for i in range(2):
                    self.new_product()

            self.logout()


    def tearDown(self):
        self.driver.close()



if __name__ == '__main__':
    unittest.main()
