import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPromptPage {
  page: Page;
  feedbackComponent: Locator;
  goodOption: Locator;
  badOption: Locator;
  closeButton: Locator;

  constructor(page: Page) {
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
