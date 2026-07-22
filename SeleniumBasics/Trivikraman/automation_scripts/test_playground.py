import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException


@pytest.mark.parametrize('message', ['Hello', 'Selenium Automation', '12345'])
def test_simple_form_submission(driver, base_url, message):
    driver.get(base_url + "simple-form-demo/")

    input_field = driver.find_element(By.ID, "user-message")
    input_field.clear()
    input_field.send_keys(message)

    show_input_btn = driver.find_element(By.ID, "showInput")
    show_input_btn.click()

    display_element = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "message"))
    )
    assert display_element.text == message


def test_checkbox_demo(driver, base_url):
    driver.get(base_url + "checkbox-demo/")

    try:
        single_checkbox = driver.find_element(By.ID, "isAgeSelected")
    except NoSuchElementException:
        single_checkbox = driver.find_element(By.XPATH, "//input[@type='checkbox']")

    if not single_checkbox.is_selected():
        single_checkbox.click()
    assert single_checkbox.is_selected()

    single_checkbox.click()
    assert not single_checkbox.is_selected()


def test_dropdown_selection(driver, base_url):
    driver.get(base_url + "select-dropdown-demo/")

    select_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "select-demo"))
    )

    select = Select(select_element)
    select.select_by_value("Wednesday")

    selected_option = select.first_selected_option
    assert selected_option.text == "Wednesday"
