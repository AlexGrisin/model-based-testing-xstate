import { test } from "@playwright/test";
import MyAccountModel from "../models/MyAccountModel.js";

const paths = MyAccountModel.model.getShortestPaths();

paths.forEach((path) => {
  test(path.description, async ({ page }) => {
    await page.goto("/en_us");
    await path.test(MyAccountModel.testParams(page));
  });
});
