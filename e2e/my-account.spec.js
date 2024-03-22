import { test } from "@playwright/test";
import MyAccountModel from "../models/MyAccountModel.js";

const paths = MyAccountModel.model.getShortestPaths();

paths.forEach((path) => {
  test(path.description, async ({ page }) => {
    console.log(path.description);
    await page.goto("https://acc5-www.raw-indigo.com/en_us");
    await path.test(MyAccountModel.testParams(page));
  });
});
