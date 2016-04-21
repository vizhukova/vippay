from NewGeneration import Helpers
import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class AddNewPartners(unittest.TestCase, Helpers):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def register(self):
        driver = self.driver
        driver.execute_script("window.scrollTo(0,0)")
        wait = WebDriverWait(driver, 10)
        register = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/ul/li[2]')
        register.click()
        input_login = driver.find_element_by_xpath('//*[@id="login"]')
        name1 = self.random_string(5)
        input_login.send_keys(name1)
        input_name = driver.find_element_by_xpath('//*[@id="full_name"]')
        name2 = self.random_string(6)
        input_name.send_keys(name2)
        input_email = driver.find_element_by_xpath('//*[@id="email"]')

        name3 = self.random_string(7)
        input_email.send_keys(name3+'@ggg.com')
        input_password = driver.find_element_by_id('password')
        price = self.inorder(999)
        input_password.send_keys(price)
        driver.implicitly_wait(5)
        input_confirm_pass = driver.find_element_by_id('confirm_pass')
        input_confirm_pass.send_keys(price)

        button_send = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/form/div/div[6]')
        button_send.click()
        button_dropdown = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li[2]/a')))
        button_dropdown.click()
        button_exit = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li[2]/ul/li[2]/a')))
        button_exit.click()


    def test_login_logout(self):

        driver = self.driver
        driver.get("http://luna.vippay.info/partners")
        driver.implicitly_wait(5)

        for i in xrange(2):
            self.register()



    def tearDown(self):
        self.driver.close()
if __name__ == '__main__':
    unittest.main()
