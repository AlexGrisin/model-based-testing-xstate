import { expect } from "@playwright/test";

export class FeedbackPromptPage {
  page;
  feedbackComponent;
  goodOption;
  badOption;
  closeButton;

  constructor(page) {
    this.page = page;
    this.feedbackComponent = page.locator(".feedback");
    this.goodOption = page.getByText("Good");
    this.badOption = page.getByText("Bad");
    this.closeButton = page.locator(".close-button");
  }

  async openPrompt() {
    await this.page.goto("/");
  }

  async isOnFeedbackPrompt() {
    await expect(this.feedbackComponent).toBeVisible();
  }

  async clickGood() {
    await this.goodOption.click();
  }

  async clickBad() {
    await this.badOption.click();
  }

  async clickClose() {
    await this.closeButton.click();
  }
}
