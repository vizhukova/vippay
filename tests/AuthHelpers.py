class AuthHelpers(object):

    def login(self, user):
        driver = self.driver
        driver.get(user['driver'])
        driver.implicitly_wait(5)
        input_email = driver.find_element_by_id('email')
        input_email.send_keys(user['email'])
        input_password = driver.find_element_by_id('password')
        input_password.send_keys(user['password'])
        button_send = driver.find_element_by_xpath('//*[@id="app-container"]/div/div/div/div/form/div/div[4]')
        button_send.click()


    def logout(self):

        driver = self.driver

        button_dropdown = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/a')
        button_dropdown.click()
        button_exit = driver.find_element_by_xpath('//*[@id="bs-example-navbar-collapse-1"]/ul[2]/li/ul/li[2]/a')
        button_exit.click()
        driver.implicitly_wait(5)





