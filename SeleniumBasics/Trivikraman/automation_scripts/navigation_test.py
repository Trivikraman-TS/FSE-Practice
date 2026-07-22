import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def run_navigation_demo():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        # Maintaining a consistent browser window size matters for responsive UI automation because responsive web layouts alter element visibility, layout structure, and DOM element coordinates across different viewport sizes.
        driver.get_window_size()
        driver.set_window_size(1280, 800)

        base_url = "https://www.lambdatest.com/selenium-playground/"
        driver.get(base_url)

        simple_form_link = driver.find_element(By.LINK_TEXT, "Simple Form Demo")
        simple_form_link.click()

        assert 'simple-form-demo' in driver.current_url

        driver.back()

        driver.execute_script('window.open("https://www.google.com");')

        handles = driver.window_handles
        driver.switch_to.window(handles[1])
        print(driver.title)

        driver.switch_to.window(handles[0])

        screenshot_path = "playground_screenshot.png"
        driver.save_screenshot(screenshot_path)

        assert os.path.exists(screenshot_path)

    finally:
        driver.quit()


if __name__ == "__main__":
    run_navigation_demo()
