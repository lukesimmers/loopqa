# Playwright Demo App Test Suite

This repository contains a Playwright-driven test suite for a demo application. The tests are data-driven and utilize the Page Object Model (POM) for maintainability and scalability. Test data—including login credentials and test cases—is stored in TypeScript files. Environment variables are managed using dotenvx, allowing different configurations for local development and CI/QA environments.

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
  - [Creating and Managing .env Files](#creating-and-managing-env-files)
  - [Running Code Using .env Files](#running-code-using-env-files)
- [Running Tests Locally](#running-tests-locally)
- [Adding New Test Cases](#adding-new-test-cases)

## Overview
This test suite verifies key functionalities of the demo application, such as user authentication and task board management. Test cases are defined in the data/testData.ts file and executed in a data-driven manner using Playwright’s test runner.

## Setup
### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- Playwright
- dotenvx (for managing encrypted environment files)


### Installation
1. Clone the repository and navigate to its directory.
2. Install dependencies:
   
   ```
   npm ci
   ```
4. Install Playwright browsers:
   
   ```
   npx playwright install --with-deps
   ```
5. Add the .env.keys file to the root directory.

## Environment Variables
This project uses environment variables for configuration (such as login credentials and the base URL).

### Creating and Managing .env Files
To create a new environment file:
1. Create a new file named according to the environment. For example, for local prod testing, create a file named .env.prod.
2. Populate the file with key-value pairs. For example:
   ```
   ADMIN_USERNAME=your_local_admin_username
   ADMIN_PASSWORD=your_local_admin_password
   BASE_URL=https://qa.example.com
   ```

5. Encrypt the file using:

   ```
   npx dotenvx encrypt -f .env.prod
   ```

6. Add the private key as an environment variable in the .yml file and add the private key to the repository secrets for Github Actions.
   
7. Your code should automatically decrypt the environment variables using .env.keys when running the code with the encrypted file. You can also run the code without the .env.keys file by manually passing the encryption key for a given file when running the code. For example:

```
DOTENV_PRIVATE_KEY_PRODUCTION="bd7c50b352ce23973ec9db355d70212305a0baaade92f0165f02915b213bfbe2" npx dotenvx run -f .env.prod-- npx playwright test
```

7. To update or add a new key, you can use the command:

```
npx dotenvx set <key> <value> -f .env.prod
```

### Running Code Using .env Files
You can use dotenvx to load environment variables from a specific file when running your tests.
For example, if you have a .env.keys file for local qa testing, you can run:

```
npx dotenvx run -f .env.qa -- npx playwright test
```

This command has been added as an npm script in your package.json for your convenience.

## Running Tests Locally
The repository includes an npm script to run tests with the appropriate environment configuration. In your package.json, you should have:

```
"scripts": 
{
  "test:qa": "dotenvx run -f .env.qa -- npx playwright test",
}
```

To run tests locally:
- For QA testing:
  ```
  npm run test:qa
  ```

## Adding New Test Cases
Test cases are defined in the data/testData.ts file. To add a new test case, simply add a new object to the testCases array following the TestCase interface. For example:
```
{
  app: 'Web Application',
  task: 'New Feature Task',
  status: 'To Do',
  description: 'Implement new feature',
  tags: ['Feature'],
  assignee: 'John Doe',
  date: '2024-02-20' 
}
```

The test spec in tests/taskBoard.spec.ts will automatically create a test for each entry in the array. The description, tags, assignee, and date parameters are optional.
