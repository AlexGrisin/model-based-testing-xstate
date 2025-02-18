import { expect, Locator, Page } from '@playwright/test';

export class FeedbackClosedPage {
  message: Locator;
  restartButton: Locator;

  constructor(page: Page) {
    this.message = page.locator('em');
    this.restartButton = page.getByText('Provide more feedback');
  }

  async isOnClosedPage() {
    await expect(this.message).toContainText('Feedback form closed.');
  }

  async restartFeedbackPrompt() {
    await this.restartButton.click();
  }
}
