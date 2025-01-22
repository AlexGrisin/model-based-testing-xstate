import { feedbackModel } from "../models/feedbackMachine.js";
import { expect, test } from "@playwright/test";

const testPlans = feedbackModel.getShortestPaths();

testPlans.forEach((testPlan) => {
  test(testPlan.description, async ({ page }) => {
    await page.goto("/");
    await testPlan.test({
      states: {
        prompt: async () => {
          await expect(page.locator(".feedback")).toBeVisible();
          console.log("-> prompt");
        },
        form: async () => {
          await expect(page.locator("textarea")).toBeVisible();
          console.log("-> form");
        },
        thanks: async () => {
          await expect(page.locator("h2")).toContainText("Thanks");
          console.log("-> thanks");
        },
        closed: async () => {
          await expect(page.locator("em")).toContainText(
            "Feedback form closed."
          );
          console.log("-> closed");
        },
      },
      events: {
        "feedback.good": async () => {
          await page.getByText("Good").click();
          console.log("--> feedback good");
        },
        "feedback.bad": async () => {
          await page.getByText("Bad").click();
          console.log("--> feedback bad");
        },
        "feedback.update": async () => {
          await page.locator("textarea").fill("test update...");
          console.log("--> feedback update");
        },
        back: async () => {
          await page.getByText("Back").click();
          console.log("--> back");
        },
        submit: async () => {
          await page.locator("textarea").fill("submit");
          await page.getByText("Submit").click();
          console.log("--> submit");
        },
        restart: async () => {
          await page.getByText("Provide more feedback").click();
          console.log("--> restart");
        },
        "feedback.close": async () => {
          await page.locator(".close-button").click();
          console.log("--> close");
        },
      },
    });
  });
});
