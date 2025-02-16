# Playwright Demo App Test Suite

This repository contains a Playwright-driven test suite for a demo application. The tests are data-driven and utilize the Page Object Model (POM) for maintainability and scalability. Test data—including login credentials and test cases—is stored in TypeScript files. Environment variables are managed using dotenvx, allowing different configurations for local development and CI/QA environments.

Table of Contents
-----------------
- Overview
- Setup
  - Prerequisites
  - Installation
- Environment Variables
  - Creating and Managing .env Files
  - Running Code Using .env Files
- Running Tests Locally
- What is npm ci?
- Adding New Test Cases
- Contributing
- License

Overview
--------
This test suite verifies key functionalities of the demo application, such as user authentication and task board management. Test cases are defined in the data/testData.ts file and executed in a data-driven manner using Playwright’s test runner.

Setup
-----
Prerequisites:
- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- Playwright
- dotenvx (for managing encrypted environment files)

Installation:
1. Clone the repository:
   git clone <repository-url>
   cd <repository-directory>
2. Install dependencies:
   npm ci
3. Install Playwright browsers:
   npx playwright install --with-deps

Environment Variables
---------------------
This project uses environment variables for configuration (such as login credentials and the base URL). There are two types of environment files:

- Local QA Environment:
  Use a plaintext file for local testing (e.g., .env.qa.local).
- CI/QA Environment:
  Use an encrypted file for CI (e.g., .env.qa), which is decrypted on the CI server.

Creating and Managing .env Files:
To create a new environment file:
1. Create a new file named according to the environment. For example, for local QA testing, create a file named .env.qa.local.
2. Populate the file with key-value pairs. For example:
   ADMIN_USERNAME=your_local_admin_username
   ADMIN_PASSWORD=your_local_admin_password
   BASE_URL=https://qa.example.com
3. (Optional) For CI, you can encrypt the file using:
   npx dotenvx encrypt -f .env.qa.local --output .env.qa
4. Make sure that any unencrypted files are added to the .gitignore file before pushing changes to main.

Running Code Using .env Files:
You can use dotenvx to load environment variables from a specific file when running your tests.
For local qa testing, run:
   npx dotenvx run -f .env.qa.local -- npx playwright test
For CI/QA, run:
   npx dotenvx run -f .env.qa -- npx playwright test
These commands have been added as npm scripts in your package.json.

Running Tests Locally
---------------------
The repository includes npm scripts to run tests with the appropriate environment configuration. In your package.json, you should have:

"scripts": {
  "test:qa-local": "dotenvx run -f .env.qa.local -- npx playwright test",
  "test:qa-ci": "dotenvx run -f .env.qa -- npx playwright test"
}

To run tests locally:
- For local QA testing:
  npm run test:qa-local
- For simulating CI/QA:
  npm run test:qa-ci

What is npm ci?
---------------
npm ci stands for "clean install." It removes your existing node_modules folder and installs dependencies exactly as specified in your package-lock.json, ensuring a consistent and reproducible setup.

Adding New Test Cases
---------------------
Test cases are defined in the data/testData.ts file. To add a new test case, simply add a new object to the testCases array following the TestCase interface. For example:

{
  app: 'Web Application',
  task: 'New Feature Task',
  status: 'To Do',
  tags: ['Feature'],
  assignee: 'John Doe',
  date: '2024-02-20'
}

The test spec in tests/taskBoard.spec.ts will automatically create a test for each entry in the array.

Contributing
------------
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure that your changes follow the existing code style and include tests for any new functionality.

License
-------
This project is licensed under the MIT License. See the LICENSE file for details.
