import { test as base } from '@playwright/test';
import { FeedbackPromptPage } from '../pageObjects/FeedbackPromptPage';
import { FeedbackFormPage } from '../pageObjects/FeedbackFormPage';
import { ThankYouPage } from '../pageObjects/ThankYouPage';
import { FeedbackClosedPage } from '../pageObjects/FeedbackClosedPage';

type Pages = {
  feedbackPromptPage: FeedbackPromptPage;
  feedbackFormPage: FeedbackFormPage;
  thankYouPage: ThankYouPage;
  feedbackClosedPage: FeedbackClosedPage;
};

export const test = base.extend<Pages>({
  feedbackPromptPage: async ({ page }, use) => {
    await use(new FeedbackPromptPage(page));
  },
  feedbackFormPage: async ({ page }, use) => {
    await use(new FeedbackFormPage(page));
  },
  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },
  feedbackClosedPage: async ({ page }, use) => {
    await use(new FeedbackClosedPage(page));
  },
});

export { expect } from '@playwright/test';
