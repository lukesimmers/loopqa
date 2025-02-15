import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AppPage } from '../pages/AppPage';
import { loginCredentials, testCases, TestCase } from '../data/testData';

test.describe('Demo App Task Board Tests', () => {
  // Before each test, navigate to the app and log in.
  test.beforeEach(async ({ page }) => {
    // Use the BASE_URL from your environment variables
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');
    const loginPage = new LoginPage(page);
    await loginPage.login(loginCredentials.username, loginCredentials.password);
  });

  // For each test case in testCases, create a separate test.
  for (const testCase of testCases) {
    test(`Verify task "${testCase.task}" in ${testCase.app} (column: ${testCase.status})`, async ({ page }) => {
      const appPage = new AppPage(page);
      // Navigate to the appropriate application section (e.g., "Web Application" or "Mobile Application")
      await appPage.navigateToSection(testCase.app);
      
      // Use the status field as the column name.
      // If status is undefined, default to an empty string (though your test data always provides one).
      await appPage.verifyTask(testCase.task, testCase.status || '', {
        // Optionally verify other details if provided:
        // description: testCase.description,  // (if you add a description field later)
        tags: testCase.tags,
        assignee: testCase.assignee,
        date: testCase.date,
      });
    });
  }
});