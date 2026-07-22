from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
try:
    from pages.base_page import BasePage
except ImportError:
    from automation_scripts.pages.base_page import BasePage


class DropdownPage(BasePage):
    SELECT_DROPDOWN = (By.ID, "select-demo")

    def __init__(self, driver):
        super().__init__(driver)

    def select_day(self, day_name: str):
        element = self.wait_for_element(self.SELECT_DROPDOWN)
        select = Select(element)
        select.select_by_value(day_name)

    def get_selected_day(self) -> str:
        element = self.wait_for_element(self.SELECT_DROPDOWN)
        select = Select(element)
        return select.first_selected_option.text
