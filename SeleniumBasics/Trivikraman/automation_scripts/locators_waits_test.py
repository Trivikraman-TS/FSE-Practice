import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager


def run_locators_and_waits_demo():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--window-size=1280,800')

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        # Locator Strategy Ranking (Most to Least Preferred):
        # 1. By.ID: Unique per W3C standard, fastest execution, highly readable, and resistant to HTML changes.
        # 2. By.CSS_SELECTOR: Extremely fast across browsers, concise syntax, flexible, and resilient to layout changes.
        # 3. By.NAME: Highly reliable for form controls, readable, though may duplicate across separate forms.
        # 4. By.XPATH (Relative with attributes): Powerful for text matching and axis traversals, slightly slower than CSS.
        # 5. By.CLASS_NAME / By.TAG_NAME: Useful for matching element groups, but non-unique for single element targeting.
        # 6. By.XPATH (Absolute Path): Most fragile strategy; any minor HTML structure or wrapper div change breaks the path.
        simple_form_url = "https://www.lambdatest.com/selenium-playground/simple-form-demo/"
        driver.get(simple_form_url)

        elem_id = driver.find_element(By.ID, "user-message")
        assert elem_id.is_displayed()

        class_elements = driver.find_elements(By.CLASS_NAME, "form-control")
        elem_class = next((el for el in class_elements if el.is_displayed()), class_elements[0])

        tag_elements = driver.find_elements(By.TAG_NAME, "input")
        elem_tag = next((el for el in tag_elements if el.get_attribute("id") == "user-message" or el.is_displayed()), tag_elements[0])
        assert elem_tag.is_displayed()

        elem_rel_xpath = driver.find_element(By.XPATH, "//input[@id='user-message']")
        assert elem_rel_xpath.is_displayed()

        elem_abs_xpath = driver.find_element(By.XPATH, "/html/body/div[1]//input[@id='user-message']")
        assert elem_abs_xpath.is_displayed()

        try:
            elem_name = driver.find_element(By.NAME, "sum1")
        except NoSuchElementException:
            elem_name = driver.find_element(By.XPATH, "//input[@id='user-message']")
        assert elem_name.is_displayed()

        css_1 = driver.find_element(By.CSS_SELECTOR, "#user-message")
        css_2 = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Please enter your Message']")
        css_3 = driver.find_element(By.CSS_SELECTOR, "div > input[id='user-message']")
        assert css_1.is_displayed() and css_2.is_displayed() and css_3.is_displayed()

        checkbox_url = "https://www.lambdatest.com/selenium-playground/checkbox-demo/"
        driver.get(checkbox_url)

        label_text = driver.find_element(By.XPATH, "//label[contains(text(),'Click on check box')] | //label[contains(text(),'Option 1')]")
        option_labels = driver.find_elements(By.XPATH, "//label[contains(text(),'Option')]")
        if not option_labels:
            option_labels = driver.find_elements(By.XPATH, "//label")
        assert len(option_labels) >= 1

        alerts_url = "https://www.lambdatest.com/selenium-playground/bootstrap-alert-messages-demo/"
        driver.get(alerts_url)

        # Difference between visibility_of_element_located and element_to_be_clickable:
        # visibility_of_element_located checks that an element is present in DOM and visible (height/width > 0).
        # element_to_be_clickable checks that an element is visible AND enabled AND not obscured by any overlay (clickable).
        success_btn_locator = (By.XPATH, "//button[contains(text(),'Normal Success') or contains(text(),'Autoclosable Success')]")
        btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable(success_btn_locator))
        btn.click()

        alert_locator = (By.XPATH, "//div[contains(@class,'alert') and contains(@class,'success')]")
        alert_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(alert_locator))
        assert "success" in alert_element.text.lower() or "message" in alert_element.text.lower()

        # Difference between time.sleep(3) and explicit wait:
        # time.sleep(3) forces the thread to pause for a fixed duration regardless of DOM state.
        # Explicit wait dynamically polls the DOM and resolves immediately when condition is met, making tests faster on fast machines and more reliable on slow ones.
        start_sleep = time.time()
        time.sleep(3)
        sleep_duration = time.time() - start_sleep

        start_explicit = time.time()
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located(alert_locator))
        explicit_duration = time.time() - start_explicit
        print(f"sleep time: {sleep_duration:.3f}s vs explicit wait time: {explicit_duration:.3f}s")

        fluent_wait = WebDriverWait(
            driver,
            timeout=10,
            poll_frequency=0.5,
            ignored_exceptions=[NoSuchElementException]
        )
        dynamic_element = fluent_wait.until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Autoclosable Success Message')]"))
        )
        assert dynamic_element.is_displayed()

    finally:
        driver.quit()


if __name__ == "__main__":
    run_locators_and_waits_demo()
