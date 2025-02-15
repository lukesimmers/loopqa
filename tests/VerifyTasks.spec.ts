import { test, expect } from '@playwright/test';
import { AppPage } from '../pages/AppPage';
import { LoginPage } from '../pages/LoginPage';
import { loginCredentials, testCases } from '../data/testData';
import { createTestName } from './utils/createTestName';

test.describe('Demo App Task Board Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Instead of using process.env.BASE_URL here,
    // rely on the baseURL defined in playwright.config.ts.
    await page.goto('/'); 
    const loginPage = new LoginPage(page);
    await loginPage.login(loginCredentials.username, loginCredentials.password);
  });

  for (const testCase of testCases) {
    const testName = createTestName(testCase);

    test(testName, async ({ page }) => {
      const appPage = new AppPage(page);
      // Navigate to the application section (this may open a new page or update the current one).
      await appPage.navigateToSection(testCase.app);
      
      // Use the status field as the column name (default to empty string if undefined).
      await appPage.verifyTask(testCase.task, testCase.status, {
        description: testCase.description,
        tags: testCase.tags,
        assignee: testCase.assignee,
        date: testCase.date,
      });
    });
  }
});