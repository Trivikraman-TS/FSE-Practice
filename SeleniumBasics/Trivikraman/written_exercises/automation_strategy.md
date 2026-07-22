# Hands-On 3: Test Automation Process, Lifecycle & Framework Types

## Task 1: Automation Decision and Test Case Selection

### 17. Five Decision Criteria for Test Automation

1. Repetitiveness & Frequency: Executed frequently across builds.
2. Business Risk & Criticality: Core feature path whose failure breaks business operations.
3. Technical Feasibility: Deterministic inputs and measurable expected outputs.
4. Data-Driven Requirements: Repeated identical execution steps with multiple datasets.
5. Feature Stability: Underlying UI/API contracts are stable.

Application to `POST /api/courses/` returning 201:
* Repetitiveness: High
* Business Risk: Critical
* Technical Feasibility: High
* Data-Driven Need: Moderate
* Feature Stability: High
* Decision: Ideal candidate for automation.

### 18. Automate vs Manual Decisions

| Scenario | Decision | Justification |
| --- | --- | --- |
| a) Regression test for all CRUD endpoints | Automate | Repetitive, run frequently on CI/CD pipeline. |
| b) Exploratory testing of new search feature | Manual | Requires human intuition and unstructured probing. |
| c) Performance test: 100 concurrent users | Automate | Requires performance testing tools. |
| d) UI test for login form | Automate | Core smoke/regression test for standard login. |
| e) Verify Swagger API documentation | Manual | Best verified visually or via schema linters. |
| f) Smoke test post-deployment | Automate | Quick health-check script executed post-deploy. |

### 19. Test Automation ROI Calculation

Parameters:
* Automation Setup Time: 4 hours = 240 minutes
* Manual Execution Time: 30 minutes per run
* Maintenance Overhead: 20% of manual execution time per run after 10th run (6 min/run after run 10)

Break-Even Calculation:
* Manual Cost for N runs = 30 * N minutes
* Automation Cost for N <= 10 runs = 240 minutes
* 30 * N = 240 => N = 8 runs.

The automation pays for itself on the 8th execution run.

### 20. Flaky Tests

* Definition: A test that produces inconsistent results (passing and failing) on the same codebase without changes.
* Example: Clicking Submit and immediately checking for dynamic message without waiting for AJAX response.
* Strategies to prevent:
  1. Use explicit waits (WebDriverWait) instead of time.sleep().
  2. Ensure test isolation with clean independent test data.
  3. Encapsulate locators in Page Objects and implement automated retries.

## Task 2: Compare Automation Framework Types

### 21. Comparison of 5 Framework Types

| Framework Type | Description | Advantage | Disadvantage | Course Management Example |
| --- | --- | --- | --- | --- |
| Linear | Sequential record and playback scripts. | Easy initial creation. | Highly fragile and hard to maintain. | Recording a single login click flow in Selenium IDE. |
| Modular | Application divided into reusable functions/modules. | Reusable code across tests. | Hardcoded test data limits parameterization. | Shared login module imported across test files. |
| Data-Driven | Test logic separated from external test data (CSV/Excel). | High test coverage with minimal code. | Requires data parsing setup. | Reading 50 course codes from CSV to run creation tests. |
| Keyword-Driven | Test steps driven by keywords in external sheets. | Non-technical users can write tests. | Complex framework maintenance. | Excel rows driving OPEN_BROWSER, CLICK_SUBMIT actions. |
| Hybrid | Combination of Modular, Data-Driven, and POM. | Maximum flexibility and maintainability. | High initial setup effort. | Pytest suite using POM, CSV test data, and HTML reporting. |

### 22. Framework Recommendation for Team Scenario

Recommendation: Hybrid Framework (Modular + Data-Driven + BDD)
* Data-Driven handles 50 user/password combinations effortlessly.
* Modular / POM encapsulates login steps for reuse across 20 test cases.
* BDD / Keyword layer allows non-technical team members to write Gherkin scenarios while engineers write POM steps.

### 23. Hybrid Framework Folder Structure

course_management_hybrid_framework/
├── config/
│   ├── config.ini
│   └── pytest.ini
├── test_data/
│   ├── login_credentials.csv
│   └── course_payloads.json
├── pages/
│   ├── base_page.py
│   ├── login_page.py
│   └── course_page.py
├── utils/
│   ├── driver_factory.py
│   ├── excel_reader.py
│   └── logger.py
├── tests/
│   ├── conftest.py
│   └── test_course_management.py
├── reports/
│   └── html_report.html
├── requirements.txt
└── README.md
