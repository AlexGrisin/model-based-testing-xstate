import { createTestMachine, createTestModel } from "@xstate/test";
import { logInWithCredentials } from "../concepts/events.js";
import { expect } from "@playwright/test";

class MyAccountModel {
  machineLogin = createTestMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QHEDKAXAhgJwHQHsA7AGXygEtCAFTGAYgBsyBJQgdXPQAtWA3TBuQgBhbJDCF05AbADaABgC6iUAAd8sTuSIqQAD0QBWAGwBGXKfmnDADnkAmY8YCcZgOwAaEAE9EpgMz2uPIhVgAs1vJu8iaGAL5xXmhYeESkFNS0YIws7JxcAGoCQqLiktIMckq66ppSOkj6RmYWVrYOTq6mnj5+NkGGofZWTobOlm4JSRg4BIQAotjY+NjplDT0AMZMsGCLy9hU+KoArqoKyo21Wg2gBgjG-s64dmEuDpbygWFevgg25kGoQB-jC-Qc9imIGSsyIAEFNpt8CdJBtskwoAB5E7oC41DQ3Qi6e5uUxBNrGRwxYak4y-RD+QxuF7+VmPQyOMIhUxQmGpQgIpEo9BouhQfAAFXwAFlvFRlgAzcgMMB4q4E+pExr3YwmCykmxOUFhNzGGzOekIeys4JDMz9E26yGJaEzfmC5GorJiyX4THYCBgbAACXIsHQK28arUGu0WrufisNlwgQczmcTxsYOMP16VrsuFNnSzj1crl5brmwfwAFswKLxVK1pkYNGQNdNcS-M5k-ZXDYAbq3qYApbzS83EDXP4bG5xrYKyk5rL5fglSqG76PcK0W2O3GuwgTOZLNY7I4XO5LfYbP5cECvvZTD3-GZyy6+XN-YGQ2GI9g5W9Rt8G3L1W2qdU6gPbVE1MZNUz7DMe2zXM-mteRcAvFx7DCMF5CzUwwgSF1CHwQN4EaPl8Sg24mgQABaOk80YxdYRIMh1iyajCUPJ5zAiLk7H8fCxjcHo-mcDD-EnEJp1nedJg-SsiH2FZmzRbjOxg-4bVnMJ0xsQwjKsBxLUk4Jb1BHDojsEceSUpd4URT0RS4yCeO029mSiPtCMGZw52ta9XxTIFHDcLN5F1GJWP5as6w09ytITBAwnsMzkzCWxQSeNwTTcHCbFi5c5UVZV6zcmMaPjOjX0y4x5GcXC8rJLpguefC2RiOCsrcaTiqIb8g1DcNI0SqqPJSslCIsHD0wmAiouC5Ms3TKlWXsUTiLiIA */
      id: "GStar",
      initial: "onHomePage",
      states: {
        onLoginPage: {
          on: {
            logInWithInvalidCredentials: {
              target: "onErrorLoginPage",
              internal: true,
            },
            logInWithValidCredentials: {
              target: "onAccountPage",
              internal: false,
            },
          },
        },
        onErrorLoginPage: {
          on: {
            closeErrorPopup: {
              target: "onLoginPage",
            },
          },
        },
        onAccountPage: {
          on: {
            logOut: {
              target: "onHomePage",
            },
            goToMyProfile: {
              target: "onMyProfilePage",
            },
            goToOrderHistory: {
              target: "onOrderHistoryPage",
            },
          },
        },
        onHomePage: {
          on: {
            goToLoginPage: {
              target: "onLoginPage",
            },
          },
        },
        onMyProfilePage: {
          on: {
            goToAccountPage: {
              target: "onAccountPage",
            },
          },
        },
        onOrderHistoryPage: {
          on: {
            goToAccountPage: {
              target: "onAccountPage",
            },
          },
        },
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {},
      services: {},
      guards: {},
      delays: {},
    }
  );

  model = createTestModel(this.machineLogin);

  testParams(page) {
    return {
      states: {
        onLoginPage: async () => {
          await expect(page.locator(".page-login")).toBeVisible();
        },
        onErrorLoginPage: async () => {
          await expect(page.locator(".page-login")).toBeVisible();
          await expect(page.locator(".alert-danger")).toBeVisible();
        },
        onAccountPage: async () => {
          await expect(page.locator(".page-myAccountPage")).toBeVisible();
        },
        onMyProfilePage: async () => {
          await expect(
            page.locator(".page-myAccountProfilePage")
          ).toBeVisible();
        },
        onOrderHistoryPage: async () => {
          await expect(page.locator(".page-myOrderHistory")).toBeVisible();
        },
        onHomePage: async () => {
          await expect(page.locator(".page-homepage")).toBeVisible();
        },
      },
      events: {
        logInWithInvalidCredentials: async function () {
          return logInWithCredentials(
            page,
            "invalid@mailinator.com",
            "test1234"
          );
        },
        logInWithValidCredentials: async function () {
          return logInWithCredentials(
            page,
            "gstar_b2c_en_nl@mailinator.com",
            "test1234"
          );
        },
        closeErrorPopup: async () => {
          await page.locator(".alert-danger", {
            visible: true,
          });
          await page.click(".alert-danger");
        },
        goToMyProfile: async () => {
          await page.goto("/en_us/account/personal-info");
        },
        goToOrderHistory: async () => {
          await page.goto("/en_us/account/orders/history");
        },
        goToAccountPage: async () => {
          await page.goto("/en_us/account");
        },
        goToLoginPage: async () => {
          await page.goto("/en_us/account/create");
        },
        logOut: async () => {
          await page.locator("#sidenav-myAccountNode", {
            visible: true,
          });
          await page.click("#sidenav-myAccountNode");
          await page.locator("#logoutSideNavLink", {
            visible: true,
          });
          await page.click("#logoutSideNavLink");
        },
      },
    };
  }
}

export default new MyAccountModel();
