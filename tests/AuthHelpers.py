class AuthHelpers(object):

    def login(self, user):
        driver = self.driver
        input_email = driver.find_element_by_xpath('//*[@id="email"]')
        input_email.send_keys(user['email'])
        input_password = driver.find_element_by_xpath('//*[@id="password"]')
        input_password.send_keys(user['password'])
        button_send = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/form/div/div[4]')
        button_send.click()

    def logout(self):

        driver = self.driver

        button_dropdown = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/a')
        button_dropdown.click()
        button_exit = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/ul/li[2]')
        button_exit.click()



