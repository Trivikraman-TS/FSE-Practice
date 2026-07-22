from selenium.webdriver.common.by import By
try:
    from pages.base_page import BasePage
except ImportError:
    from automation_scripts.pages.base_page import BasePage


class CheckboxPage(BasePage):
    SINGLE_CHECKBOX = (By.ID, "isAgeSelected")
    FALLBACK_CHECKBOX = (By.XPATH, "//input[@type='checkbox']")

    def __init__(self, driver):
        super().__init__(driver)

    def _get_target(self, index: int = 0):
        try:
            return self.driver.find_element(*self.SINGLE_CHECKBOX)
        except Exception:
            return self.driver.find_element(*self.FALLBACK_CHECKBOX)

    def check_option(self, index: int = 0):
        target = self._get_target(index)
        if not target.is_selected():
            target.click()

    def uncheck_option(self, index: int = 0):
        target = self._get_target(index)
        if target.is_selected():
            target.click()

    def is_option_checked(self, index: int = 0) -> bool:
        target = self._get_target(index)
        return target.is_selected()
