from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class Shopping(unittest.TestCase, Helpers, AuthHelpers):
    def setUp(self):
        self.driver = webdriver.Firefox()

    def order_product(self):
        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")
        wait = WebDriverWait(driver, 10)
        input_email = wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="form"]/div[2]/div[4]/div[1]/input')))
        name0 = self.random_string(7)
        input_email.send_keys(name0+'@ggg.com')
        input_name = driver.find_element_by_id('name')
        name1 = self.random_string(6)
        input_name.send_keys(name1)
        input_telephone = driver.find_element_by_id('telephone')
        price = self.inorder(9999999)
        input_telephone.send_keys(price)
        button_add_order = driver.find_element_by_xpath('//*[@id="form"]/div[2]/button')
        button_add_order.click()

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
            driver.execute_script("window.scrollTo(0,0)")
            wait = WebDriverWait(driver, 10)
            self.login(user)
            driver.implicitly_wait(5)
            category = wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')))
            category.click()
            all_categories = driver.find_elements_by_class_name('category-link')
            i = 0
            for elem_category in all_categories:
                all_categories = driver.find_elements_by_class_name('category-link')
                all_categories[i].click()
                driver = self.driver
                list_orders = driver.find_elements_by_partial_link_text('http://luna.vippay.info/order/')
                x = 0
                for order in list_orders:
                    list_orders = driver.find_elements_by_partial_link_text('http://luna.vippay.info/order/')

                    Button('Ctrl+T').click

                    driver.get(list_orders[x])
                    self.order_product()
                    list_orders = driver.find_elements_by_partial_link_text('http://luna.vippay.info/order/')
                    list_orders[x].click()
                    x += 1
                category = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[1]/li[1]/a')
                category.click()
                i += 1

            self.logout()

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()