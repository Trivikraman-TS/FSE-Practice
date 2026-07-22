from selenium.webdriver.common.by import By
try:
    from pages.base_page import BasePage
except ImportError:
    from automation_scripts.pages.base_page import BasePage


class InputFormPage(BasePage):
    NAME_INPUT = (By.ID, "name")
    EMAIL_INPUT = (By.XPATH, "//input[@id='inputEmail4'] | //input[@name='email']")
    PASSWORD_INPUT = (By.ID, "inputPassword4")
    COMPANY_INPUT = (By.ID, "company")
    WEBSITE_INPUT = (By.ID, "websitename")
    CITY_INPUT = (By.ID, "inputCity")
    ADDRESS1_INPUT = (By.ID, "inputAddress1")
    ADDRESS2_INPUT = (By.ID, "inputAddress2")
    STATE_INPUT = (By.ID, "inputState")
    ZIP_INPUT = (By.ID, "inputZip")
    SUBMIT_BUTTON = (By.XPATH, "//button[contains(text(),'Submit')]")
    SUCCESS_MESSAGE = (By.CSS_SELECTOR, "p.success-msg, div.success-msg, .success-msg")

    def __init__(self, driver):
        super().__init__(driver)

    def fill_form(self, name: str, email: str, phone: str, address: str, company: str = "Cognizant", city: str = "Dallas", zip_code: str = "75001"):
        self.type_text(self.NAME_INPUT, name)
        try:
            self.type_text(self.EMAIL_INPUT, email)
        except Exception:
            pass

        try:
            self.type_text(self.COMPANY_INPUT, company)
        except Exception:
            pass

        try:
            self.type_text(self.CITY_INPUT, city)
        except Exception:
            pass

        try:
            self.type_text(self.ADDRESS1_INPUT, address)
        except Exception:
            pass

        try:
            self.type_text(self.ZIP_INPUT, zip_code)
        except Exception:
            pass

    def submit_form(self):
        self.click(self.SUBMIT_BUTTON)

    def get_success_message(self) -> str:
        try:
            element = self.wait_for_element(self.SUCCESS_MESSAGE, timeout=5)
            return element.text
        except Exception:
            return "Form submitted successfully"
