from selenium.webdriver.common.by import By
try:
    from pages.base_page import BasePage
except ImportError:
    from automation_scripts.pages.base_page import BasePage


class SimpleFormPage(BasePage):
    MESSAGE_INPUT = (By.ID, "user-message")
    SHOW_INPUT_BUTTON = (By.ID, "showInput")
    MESSAGE_DISPLAY = (By.ID, "message")

    def __init__(self, driver):
        super().__init__(driver)

    def enter_message(self, text: str):
        self.type_text(self.MESSAGE_INPUT, text)

    def click_submit(self):
        self.click(self.SHOW_INPUT_BUTTON)

    def get_displayed_message(self) -> str:
        element = self.wait_for_element(self.MESSAGE_DISPLAY)
        return element.text
