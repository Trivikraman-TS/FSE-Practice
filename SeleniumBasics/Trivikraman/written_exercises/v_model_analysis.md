# Hands-On 2: SDLC vs TDLC — V-Model & Agile QA Integration

## Task 1: V-Model Mapping

### 9. V-Model Diagram

SDLC (Development)                        TDLC (Testing)
Requirements Analysis  ----------> Acceptance Testing (UAT)
  System Design         ----------> System Testing
    Architecture Design   ----------> Integration Testing
      Module Design       ----------> Unit Testing
        Coding (Implementation)

### 10. Test Artifacts per SDLC Phase

* Requirements Analysis -> Acceptance Test Plan & User Acceptance Criteria / Gherkin Scenarios
* System Design -> System Test Suite & End-to-End Test Cases
* Architecture Design -> Integration Test Plan & API Interface Test Suite
* Module Design -> Unit Test Specifications & Mocks/Fixtures

### 11. Entry & Exit Criteria

| Testing Level | Entry Criteria | Exit Criteria |
| --- | --- | --- |
| Unit Testing | Code compiles; LLD completed; unit framework ready | 100% unit tests run; 85%+ coverage; 0 critical unit bugs |
| Integration Testing | Unit exit criteria met; API endpoints deployed | 100% integration tests run; interface contracts verified; 0 critical bugs |
| System Testing | Integration exit criteria met; full build deployed | 100% system test suite executed; 95%+ pass rate; 0 critical bugs |
| Acceptance Testing | System exit criteria met; UAT environment ready | All business workflows verified by users; UAT sign-off granted |

### 12. Early QA Engagement Points

1. Requirements Review: QA reviews user stories before development to clarify edge cases and ambiguities early.
2. Architecture & API Design Review: QA reviews OpenAPI schemas to catch missing error response definitions before coding.

## Task 2: Agile QA and Shift-Left Testing

### 13. Problems of Late Testing in Waterfall

1. High cost of fixing defects late in the cycle.
2. Squeezed QA window due to development delays.
3. Misaligned requirements discovered late after feature is fully built.

### 14. QA Role in Agile Ceremonies

* Sprint Planning: Defines acceptance criteria, estimates QA tasks, plans sprint tests.
* Daily Standup: Reports testing progress, highlights blockers, coordinates bug fixes.
* Sprint Review: Demos working features to stakeholders and validates acceptance criteria.
* Retrospective: Analyzes root causes of defects and suggests testing process improvements.

### 15. Shift-Left Practices for Course Management API

1. Requirement Testability Review: Refine vague rules into precise input length and format constraints.
2. TDD/BDD: Write Given-When-Then test cases before code is written.
3. Static Code Analysis: Run linters (flake8, SonarQube) in CI pipeline.
4. API Contract Testing: Validate OpenAPI contracts before frontend/backend integration.

### 16. Acceptance Criteria (Given-When-Then Format)

Scenario 1: Happy Path - Create new valid course
Given College Admin is authenticated
And course code "CS105" does not exist
When admin submits POST to create course with code "CS105", title "Python Intro", credits 4
Then status code 201 is returned
And course "CS105" appears in catalog

Scenario 2: Duplicate course code
Given College Admin is authenticated
And course code "CS101" already exists
When admin submits POST to create course with code "CS101"
Then status code 409 is returned with duplicate error message

Scenario 3: Missing mandatory field
Given College Admin is authenticated
When admin submits POST to create course missing credits field
Then status code 422 is returned indicating credits is required
