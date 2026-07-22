from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BasePage:
    def __init__(self, driver):
        self.driver = driver

    def navigate_to(self, url: str):
        self.driver.get(url)

    def get_title(self) -> str:
        return self.driver.title

    def wait_for_element(self, locator: tuple, timeout: int = 10):
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located(locator)
        )

    def wait_for_clickable(self, locator: tuple, timeout: int = 10):
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable(locator)
        )

    def find_element(self, locator: tuple):
        return self.driver.find_element(*locator)

    def find_elements(self, locator: tuple):
        return self.driver.find_elements(*locator)

    def click(self, locator: tuple):
        element = self.wait_for_clickable(locator)
        element.click()

    def type_text(self, locator: tuple, text: str):
        element = self.wait_for_element(locator)
        element.clear()
        element.send_keys(text)
