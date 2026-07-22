"""
If the Submit button's ID changed from 'submit' to 'btn-submit' in a flat script, every test script hardcoding `driver.find_element(By.ID, 'submit')` breaks and requires updating in multiple places. In POM, locators are defined once in the Page class (`SHOW_INPUT_BUTTON = (By.ID, 'submit')`). Updating that single line updates the locator for all test cases without modifying test logic.
"""

import pytest
try:
    from pages.simple_form_page import SimpleFormPage
    from pages.checkbox_page import CheckboxPage
    from pages.dropdown_page import DropdownPage
    from pages.input_form_page import InputFormPage
except ImportError:
    from automation_scripts.pages.simple_form_page import SimpleFormPage
    from automation_scripts.pages.checkbox_page import CheckboxPage
    from automation_scripts.pages.dropdown_page import DropdownPage
    from automation_scripts.pages.input_form_page import InputFormPage


@pytest.mark.parametrize('message', ['Hello', 'Selenium Automation', '12345'])
def test_simple_form_submission_pom(driver, base_url, message):
    page = SimpleFormPage(driver)
    page.navigate_to(base_url + "simple-form-demo/")
    page.enter_message(message)
    page.click_submit()
    assert page.get_displayed_message() == message


def test_checkbox_demo_pom(driver, base_url):
    page = CheckboxPage(driver)
    page.navigate_to(base_url + "checkbox-demo/")

    page.check_option(0)
    assert page.is_option_checked(0)

    page.uncheck_option(0)
    assert not page.is_option_checked(0)


def test_dropdown_selection_pom(driver, base_url):
    page = DropdownPage(driver)
    page.navigate_to(base_url + "select-dropdown-demo/")

    page.select_day("Wednesday")
    assert page.get_selected_day() == "Wednesday"


def test_input_form_submit_pom(driver, base_url):
    page = InputFormPage(driver)
    page.navigate_to(base_url + "input-form-demo/")

    page.fill_form(
        name="Automation Student",
        email="student@cognizant.com",
        phone="555-0199",
        address="100 Tech Blvd",
        company="Cognizant Digital Nurture"
    )
    page.submit_form()
    success_msg = page.get_success_message()
    assert len(success_msg) > 0
