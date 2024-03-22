import CustomerJourney from "../models/CustomerJourney.js";

const paths = CustomerJourney.model.getShortestPaths();

describe("events called with next state", () => {
  describe(`shortest ${paths.length} paths`, () => {
    paths.forEach((path) => {
      it(path.description, async () => {
        await path.test({
          states: {
            onHomePage: () => {
              console.log("-> on home page");
            },
            onSearchResultsPage: () => {
              console.log("-> on search page");
            },
            onProductListerPage: () => {
              console.log("-> on plp");
            },
            onProductDetailPage: () => {
              console.log("-> on pdp");
            },
            productAddedToCart: () => {
              console.log("-> on pdp: product in cart");
            },
            onCartPage: () => {
              console.log("-> on cart page");
            },
            onLoginForm: () => {
              console.log("-> on login form");
            },
            onShippingPage: () => {
              console.log("-> on shipping page");
            },
            onFilledShippingPage: () => {
              console.log("-> on filled shipping page");
            },
            onStoreSelectionPage: () => {
              console.log("-> on store selection page");
            },
            onDeliveryAddressPage: () => {
              console.log("-> on delivery address page");
            },
            onPaymentPage: () => {
              console.log("-> on payment page");
            },
            onFilledPaymentPage: () => {
              console.log("-> on filled payment page");
            },
            onSuccessOrderPage: () => {
              console.log("-> on success order page");
            },
          },
          events: {
            searchProduct: () => {
              console.log("--> home: search product");
            },
            goToCategoryPage: () => {
              console.log("--> home: go to category");
            },
            goToPDP: () => {
              console.log("--> search/plp: go to pdp");
            },
            addProductToCart: () => {
              console.log("--> pdp: product added to cart");
            },
            goToCartPage: () => {
              console.log("--> pdp: go to cart");
            },
            goToCheckout: () => {
              console.log("--> cart: go to checkout");
            },
            proceedAsGuestUser: () => {
              console.log("--> login: guest");
            },
            loginWithExistingUser: () => {
              console.log("--> login: existing");
            },
            selectCollectInStore: () => {
              console.log("--> shipping: select collect in store");
            },
            selectStore: () => {
              console.log("--> store selection: select store");
            },
            selectHomeDelivery: () => {
              console.log("--> shipping: select home delivery");
            },
            fillDeliveryAddress: () => {
              console.log("--> delivery: fill delivery address");
            },
            goToPaymentPage: () => {
              console.log("--> shipping: go to payment");
            },
            selectCreditCardPayment: () => {
              console.log("--> payment: select credit card");
            },
            fillCardDetails: () => {
              console.log("--> cc: fill card details");
            },
            selectKlarnaPayment: () => {
              console.log("--> payment: select klarna");
            },
            fillKlarnaAccount: () => {
              console.log("--> klarna: fill klarna account");
            },
            submitOrder: () => {
              console.log("--> payment: submit order");
            },
          },
        });
      });
    });
  });
});
