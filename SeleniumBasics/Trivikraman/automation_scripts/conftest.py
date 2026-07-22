import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture(scope='session')
def base_url():
    return 'https://www.lambdatest.com/selenium-playground/'


@pytest.fixture(scope='function')
def driver():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--window-size=1280,800')

    service = Service(ChromeDriverManager().install())
    browser_driver = webdriver.Chrome(service=service, options=chrome_options)
    browser_driver.implicitly_wait(5)

    yield browser_driver

    browser_driver.quit()


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == "call" and report.failed:
        driver_fixture = item.funcargs.get('driver')
        if driver_fixture:
            test_name = item.name.replace("/", "_").replace(":", "_")
            screenshot_file = f"{test_name}_failure.png"
            driver_fixture.save_screenshot(screenshot_file)
