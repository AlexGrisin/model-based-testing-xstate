import { test } from "../fixtures/testFixtures.js";
import { feedbackModel } from "../models/feedbackMachine.js";

const testPlans = feedbackModel.getShortestPaths();

testPlans.forEach((testPlan) => {
  test(
    testPlan.description,
    async ({
      feedbackPromptPage,
      feedbackFormPage,
      thankYouPage,
      feedbackClosedPage,
    }) => {
      await feedbackPromptPage.openPrompt();
      await testPlan.test({
        states: {
          prompt: async () => {
            await feedbackPromptPage.isOnFeedbackPrompt();
          },
          feedbackForm: async () => {
            await feedbackFormPage.isOnFeedbackForm();
          },
          thankYou: async () => {
            await thankYouPage.isOnThankYouPage();
          },
          closed: async () => {
            await feedbackClosedPage.isOnClosedPage();
          },
        },
        events: {
          "prompt.good": async () => {
            await feedbackPromptPage.clickGood();
          },
          "prompt.bad": async () => {
            await feedbackPromptPage.clickBad();
          },
          "feedbackForm.update": async () => {
            await feedbackFormPage.fillFeedbackForm();
          },
          "feedbackForm.back": async () => {
            await feedbackFormPage.clickBack();
          },
          "feedbackForm.submit": async () => {
            await feedbackFormPage.submitFeedbackForm();
          },
          "closed.restart": async () => {
            await feedbackClosedPage.restartFeedbackPrompt();
          },
          "prompt.close": async () => {
            await feedbackPromptPage.clickClose();
          },
          "feedbackForm.close": async () => {
            await feedbackPromptPage.clickClose();
          },
        },
      });
    }
  );
});
