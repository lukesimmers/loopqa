// pages/AppPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class AppPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on the application type button.
   * The button is identified by an h2 element with the given appName.
   * @param appName The name of the application section (e.g., "Web Application")
   */
  async navigateToSection(appName: string): Promise<void> {
    // Locate the button containing an h2 with the specified text.
    const appButton: Locator = this.page.locator(`button:has(h2:text("${appName}"))`);
    await appButton.click();
    // Wait for the network to be idle
    await this.page.waitForLoadState('networkidle');
    // Wait for at least one column header to be visible to ensure content has loaded.
    await this.page.locator('div.flex-col h2').first().waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Returns a Locator for a column based on its name.
   * Columns are identified as divs with the class "flex-col" that contain an h2 with the column name.
   * @param columnName The name of the column (e.g., "To Do", "In Progress")
   */
  getColumnLocator(columnName: string): Locator {
    return this.page.locator(`div.flex-col:has(h2:text("${columnName}"))`);
  }

  /**
   * Returns a Locator for a task within a given column.
   * Each task is a div that contains an h3 element with the task title.
   * @param taskTitle The title of the task (from an h3 element)
   * @param columnName The column in which the task should reside
   */
  getTaskLocator(taskTitle: string, columnName: string): Locator {
    const columnLocator = this.getColumnLocator(columnName);
    return columnLocator.locator(`div:has(> h3:text("${taskTitle}"))`);
  }

  /**
   * Verifies that a task exists in a given column and optionally checks its details.
   * You can verify the description, tags, assignee, and date.
   *
   * @param taskTitle The title of the task to verify.
   * @param columnName The column where the task is expected.
   * @param options Optional details to verify:
   *   - description: The expected text in the task's description (p element)
   *   - tags: An array of expected tag texts (span.rounded-full elements)
   *   - assignee: The expected name of the person the task is assigned to, located in a div with an avatar icon (svg.lucide-user).
   *   - date: The expected date, located in a div with a calendar icon (svg.lucide-calendar).
   */
  async verifyTask(
    taskTitle: string,
    columnName: string,
    options: {
      description?: string;
      tags?: string[];
      assignee?: string;
      date?: string;
    } = {}
  ): Promise<void> {
    const taskLocator = this.getTaskLocator(taskTitle, columnName);
    // Wait for the task to be visible, accounting for asynchronous loading.
    await expect(taskLocator).toBeVisible();

    // Verify description if provided.
    if (options.description) {
      const descriptionLocator = taskLocator.locator('p');
      await expect(descriptionLocator).toHaveText(options.description);
    }

    // Verify each expected tag.
    if (options.tags && options.tags.length > 0) {
      for (const tag of options.tags) {
        const tagLocator = taskLocator.locator(`span.rounded-full:has-text("${tag}")`);
        await expect(tagLocator).toBeVisible();
      }
    }

    // Verify assignee if provided.
    if (options.assignee) {
      // Assignee's name is located within a div that also contains the avatar icon (svg.lucide-user).
      const assigneeLocator = taskLocator.locator('div:has(> svg.lucide-user)');
      await expect(assigneeLocator).toHaveText(options.assignee);
    }

    // Verify date if provided.
    if (options.date) {
      // The date is located within a div that also contains a calendar icon (svg.lucide-calendar).
      const dateLocator = taskLocator.locator('div:has(> svg.lucide-calendar)');
      await expect(dateLocator).toHaveText(options.date);
    }
  }
}