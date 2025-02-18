import { expect } from "@playwright/test";

export class FeedbackClosedPage {
  message;
  restartButton;

  constructor(page) {
    this.message = page.locator("em");
    this.restartButton = page.getByText("Provide more feedback");
  }

  async isOnClosedPage() {
    await expect(this.message).toContainText("Feedback form closed.");
  }

  async restartFeedbackPrompt() {
    await this.restartButton.click();
  }
}
