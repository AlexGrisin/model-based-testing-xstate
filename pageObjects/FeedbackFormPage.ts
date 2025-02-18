import { expect, Locator, Page } from '@playwright/test';

export class FeedbackFormPage {
  feedbackFormTextArea: Locator;
  submitButton: Locator;
  backButton: Locator;

  constructor(page: Page) {
    this.feedbackFormTextArea = page.locator('textarea');
    this.submitButton = page.getByText('Submit');
    this.backButton = page.getByText('Back');
  }

  async isOnFeedbackForm() {
    await expect(this.feedbackFormTextArea).toBeVisible();
  }

  async fillFeedbackForm() {
    await this.feedbackFormTextArea.fill('test update...');
  }

  async submitFeedbackForm() {
    await this.submitButton.click({ force: true });
  }

  async clickBack() {
    await this.backButton.click();
  }
}
