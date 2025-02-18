import { test } from '../fixtures/testFixture';
import { feedbackModel } from '../models/feedbackModel.js';

const testPlans = feedbackModel.getShortestPaths();

testPlans.forEach((testPlan) => {
  test(testPlan.description, async ({ feedbackPromptPage, feedbackFormPage, thankYouPage, feedbackClosedPage }) => {
    await feedbackPromptPage.openPrompt();
    await testPlan.test({
      states: {
        prompt: async () => {
          await feedbackPromptPage.isOnFeedbackPrompt();
        },
        form: async () => {
          await feedbackFormPage.isOnFeedbackForm();
        },
        thanks: async () => {
          await thankYouPage.isOnThankYouPage();
        },
        closed: async () => {
          await feedbackClosedPage.isOnClosedPage();
        },
      },
      events: {
        'feedback.good': async () => {
          await feedbackPromptPage.clickGood();
        },
        'feedback.bad': async () => {
          await feedbackPromptPage.clickBad();
        },
        'form.update': async () => {
          await feedbackFormPage.fillFeedbackForm();
        },
        'form.back': async () => {
          await feedbackFormPage.clickBack();
        },
        'form.submit': async () => {
          await feedbackFormPage.submitFeedbackForm();
        },
        'closed.restart': async () => {
          await feedbackClosedPage.restartFeedbackPrompt();
        },
        'prompt.close': async () => {
          await feedbackPromptPage.clickClose();
        },
        'form.close': async () => {
          await feedbackPromptPage.clickClose();
        },
      },
    });
  });
});
