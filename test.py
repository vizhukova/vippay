# -*- coding: utf-8 -*-
import unittest
from selenium import webdriver
#from selenium.webdriver.common.keys import Keys


class PythonOrgSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://panda.od.ua")

    def test_present_meta(self):
        title = self.driver.find_element_by_xpath("//title")
        keywords = self.driver.find_element_by_xpath("//meta[@name='keywords']")
        description = self.driver.find_element_by_xpath("//meta[@name='description']")

        self.assertIsNotNone(title)
        self.assertIsNotNone(keywords)
        self.assertIsNotNone(description)

    def test_h1_assert(self):
        h1 = self.driver.find_elements_by_tag_name("h1")
        self.assertLessEqual(len(h1), 1)

    def test_id_duplicate(self):
        ids = [x.get_attribute('id') for x in self.driver.find_elements_by_xpath("//*[@id]")]
        seen = set()
        duplicate_list = set(x for x in ids if x in seen or seen.add(x))
        self.assertEquals(len(list(duplicate_list)), 0, "Duplicate id's: %s" % ",".join(duplicate_list))


    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()


# driver = webdriver.Firefox()
# driver.get("http://www.python.org")
#
# description = driver.find_element_by_xpath("//meta[@name='description']")
#
# keywords = driver.find_element_by_xpath("//meta[@name='keywords']")
#
# assert "No results found." not in driver.page_source
# driver.close()
