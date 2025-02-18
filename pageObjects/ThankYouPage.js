import { expect } from "@playwright/test";

export class ThankYouPage {
  header;

  constructor(page) {
    this.header = page.locator("h2");
  }

  async isOnThankYouPage() {
    await expect(this.header).toContainText("Thanks");
  }
}
