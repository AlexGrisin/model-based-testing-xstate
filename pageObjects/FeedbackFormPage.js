import { expect } from "@playwright/test";

export class FeedbackFormPage {
  feedbackFormTextArea;
  submitButton;
  backButton;

  constructor(page) {
    this.feedbackFormTextArea = page.locator("textarea");
    this.submitButton = page.getByText("Submit");
    this.backButton = page.getByText("Back");
  }

  async isOnFeedbackForm() {
    await expect(this.feedbackFormTextArea).toBeVisible();
  }

  async fillFeedbackForm() {
    await this.feedbackFormTextArea.fill("test update...");
  }

  async submitFeedbackForm() {
    await this.submitButton.click({ force: true });
  }

  async clickBack() {
    await this.backButton.click();
  }
}
