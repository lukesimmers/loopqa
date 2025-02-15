import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AppPage } from '../pages/AppPage';
import { loginCredentials, testCases } from '../data/testData';

test.describe('Demo App Task Board Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Instead of using process.env.BASE_URL here,
    // rely on the baseURL defined in playwright.config.ts.
    await page.goto('/'); 
    const loginPage = new LoginPage(page);
    await loginPage.login(loginCredentials.username, loginCredentials.password);
  });

  for (const testCase of testCases) {
    test(`Verify task "${testCase.task}" in ${testCase.app} (column: ${testCase.status})`, async ({ page }) => {
      const appPage = new AppPage(page);
      // Navigate to the application section (this may open a new page or update the current one).
      await appPage.navigateToSection(testCase.app);
      
      // Use the status field as the column name (default to empty string if undefined).
      await appPage.verifyTask(testCase.task, testCase.status || '', {
        tags: testCase.tags,
        assignee: testCase.assignee,
        date: testCase.date,
      });
    });
  }
});