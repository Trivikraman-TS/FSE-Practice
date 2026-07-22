# Hands-On 1: QA Concepts, Functional Testing & Defect Lifecycle

## Task 1: Map Testing Types to a Real System

### 1. Test Levels Applied to Course Management API

* Unit Testing: Test `validate_course_code(code: str)` in isolation. Verify that passing an invalid format raises a ValidationError without database calls.
* Integration Testing: Test interaction between `CourseService.create_course()` and PostgreSQL database repository. Verify SQL query execution and created Course entity return.
* System Testing: Send HTTP POST request to `/api/courses/` endpoint with valid JSON payload. Verify HTTP 201 Created and subsequent GET request returns course details.
* User Acceptance Testing (UAT): College Administrator logs in, creates a new semester course, assigns an instructor, and verifies students can view and enroll.

### 2. Functional vs Non-Functional Testing

* Functional Testing: Verifies what the system does. All four test cases above are functional as they test business logic and requirements.
* Non-Functional Testing: Verifies how well the system performs under constraints.
  * Example (Performance Testing): Simulate 500 concurrent users calling `POST /api/courses/` and verify response latency stays below 200ms with CPU usage under 75%.

### 3. Black-Box Testing vs White-Box Testing

| Feature | Black-Box Testing | White-Box Testing |
| --- | --- | --- |
| Knowledge of Code | No knowledge of internal code structure. Tested via inputs and outputs. | Full knowledge of source code, internal logic, and architecture. |
| Focus | Functional behavior, API contracts, and user interface. | Code coverage, exception handling, and algorithm performance. |
| Performed By | QA Testers / Automation Engineers | Software Developers |
| Example | Testing `POST /api/courses/` with Postman and verifying status codes. | Writing PyTest unit tests with mocks to test logic branches in source code. |

### 4. Formal Test Cases for POST /api/courses/

| Test Case ID | Description | Preconditions | Test Steps | Expected Result | Actual Result | Pass/Fail |
| --- | --- | --- | --- | --- | --- | --- |
| TC_API_001 | Create course with valid mandatory fields | API service running; Admin authenticated | 1. Send POST to /api/courses/<br>2. Payload: {"course_code": "CS101", "title": "Data Structures", "credits": 3} | HTTP 201 Created with created course details | | |
| TC_API_002 | Reject creation of duplicate course code | Course CS101 already exists in database | 1. Send POST to /api/courses/<br>2. Payload: {"course_code": "CS101", "title": "Advanced DS", "credits": 4} | HTTP 400 or 409 with duplicate error message | | |
| TC_API_003 | Fail validation when credits field is missing | API service running; Admin authenticated | 1. Send POST to /api/courses/<br>2. Payload: {"course_code": "CS102", "title": "Algorithms"} | HTTP 422 or 400 indicating missing credits field | | |

## Task 2: Defect Lifecycle & Severity Classification

### 5. Defect Lifecycle Diagram and Description

States: New -> Assigned -> Open -> Fixed -> Retest -> Verified -> Closed

Alternative Paths:
* Rejected: Invalid bug, duplicate, or working as designed.
* Deferred: Valid bug postponed to a later release.
* Reopened: Retest failed; assigned back to developer.

### 6. Severity & Priority Classification

| Scenario | Severity | Priority | Justification |
| --- | --- | --- | --- |
| a) POST /api/courses/ returns 500 error for all requests | Critical | P1 | System crashes on core feature; blocks all course creation testing. |
| b) Course names > 150 chars truncated silently | Medium | P2 | Causes data truncation without error; must be fixed in current sprint. |
| c) /docs Swagger page has a typo in description | Low | P4 | Minor cosmetic issue with no functional impact. |
| d) Login with correct credentials occasionally returns 401 | High | P1 | Intermittent auth failure indicates session instability; requires immediate fix. |

### 7. Defect Report for Bug (a)

* Defect ID: DEF-2026-0041
* Title: POST /api/courses/ returns 500 Internal Server Error for all requests
* Environment: Staging QA Environment
* Build Version: v2.4.0-rc1
* Severity: Critical
* Priority: P1
* Steps to Reproduce:
  1. Login as Admin and get Bearer token.
  2. Send POST to /api/courses/ with payload: {"course_code": "CS201", "title": "OOP", "credits": 4}
* Expected Result: HTTP 201 Created.
* Actual Result: HTTP 500 Internal Server Error.
* Attachments: screenshot_of_500_error.png

### 8. Severity vs Priority Explanation

* Severity measures technical impact on the system (e.g., crash, data loss).
* Priority measures business urgency of fixing the bug.
* Example of High Severity / Low Priority: Unhandled exception when exporting archived logs from 2005 (crashes worker thread, but used once a year by one compliance auditor).
