"""
Selenium Components:
1. WebDriver: An object-oriented API that communicates directly with the browser using the W3C protocol to send native commands.
2. Selenium Grid: A server hub/node architecture that solves long execution times by running tests in parallel across multiple machines, OSs, and browsers.
3. Selenium IDE: A browser extension used for record-and-playback, rapid test creation, and code generation.
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def run_setup_demo():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--window-size=1920,1080')

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        # Setting implicit wait globally (driver.implicitly_wait(10)) is considered a bad practice compared to explicit waits because it applies globally to all element lookups, slows down failure detection when checking element absence, and causes non-deterministic timeouts when combined with explicit waits.
        driver.implicitly_wait(10)

        target_url = "https://www.lambdatest.com/selenium-playground/"
        driver.get(target_url)

        page_title = driver.title
        print(page_title)

        assert "Selenium Grid Online" in page_title or "LambdaTest" in page_title

    finally:
        driver.quit()


if __name__ == "__main__":
    run_setup_demo()
