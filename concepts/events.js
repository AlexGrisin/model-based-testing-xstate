export async function logInWithCredentials(page, user, password) {
  await page.locator("#j_username").fill(user);
  await page.locator("#j_password").fill(password);
  await page.locator(".checkout-formButton--save").click();
}
