import { expect, Locator, Page } from '@playwright/test';

export class ThankYouPage {
  header: Locator;

  constructor(page: Page) {
    this.header = page.locator('h2');
  }

  async isOnThankYouPage() {
    await expect(this.header).toContainText('Thanks');
  }
}
