export const onLoginPage = async () => {
  await page.waitForSelector(".page-login");
};

export const onErrorLoginPage = async () => {
  await page.waitForSelector(".page-login");
  await page.waitForSelector(".alert-danger");
};

export const onAccountPage = async () => {
  await page.waitForSelector(".page-myAccountPage");
};

export const onMyProfilePage = async () => {
  await page.waitForSelector(".page-myAccountProfilePage");
};

export const onOrderHistoryPage = async () => {
  await page.waitForSelector(".page-myOrderHistory");
};

export const onHomePage = async () => {
  await page.waitForSelector(".page-homepage");
};
