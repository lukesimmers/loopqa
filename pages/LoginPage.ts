

import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.usernameInput = page.locator('input#username');
      this.passwordInput = page.locator('input#password');
      this.loginButton = page.locator('button[type="submit"]');
    }
  
    async login(email: string, password: string) {
      await this.usernameInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  }