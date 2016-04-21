from AuthHelpers import AuthHelpers
from NewGeneration import Helpers
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewCategory(unittest.TestCase, Helpers, AuthHelpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def create_category(self):
        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")
        wait = WebDriverWait(driver, 10)
        add_category = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="app-container"]/div/div[3]/div/div/div/div/div[1]/a')))
        add_category.click()
        name_input = driver.find_element_by_id('newCategory')
        name = self.random_string(8)
        name_input.send_keys(name)

        button_add_category = driver.find_element_by_xpath('//*[@id="app-container"]/div/div[3]/div/form/button')
        button_add_category.click()

    def test_login_logout(self):


        mock_user = [


            {
                'driver': '://111.vippay.test/',
                'email': '111',
                'password': '111'
            },
            {
                'driver': 'http://222.vippay.test/',
                'email': '222',
                'password': '222'
            },
            {
                'driver': 'http://333.vippay.test/',
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
            

            for i in xrange(5):
                self.create_category()
            self.logout()


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
