import { createTestMachine, createTestModel } from "@xstate/test";

class CustomerJourney {
  machine = createTestMachine(
    {
      context: {
        isKlarnaEnabled: true,
        isCollectInStoreEnabled: true,
      },
      id: "New Machine",
      initial: "onHomePage",
      states: {
        onHomePage: {
          on: {
            searchProduct: {
              target: "onSearchResultsPage",
            },
            goToCategoryPage: {
              target: "onProductListerPage",
            },
          },
        },
        onSearchResultsPage: {
          on: {
            goToPDP: {
              target: "onProductDetailPage",
            },
          },
        },
        onProductListerPage: {
          on: {
            goToPDP: {
              target: "onProductDetailPage",
            },
          },
        },
        onProductDetailPage: {
          on: {
            addProductToCart: {
              target: "productAddedToCart",
            },
          },
        },
        productAddedToCart: {
          on: {
            goToCartPage: {
              target: "onCartPage",
            },
          },
        },
        onCartPage: {
          on: {
            goToCheckout: {
              target: "onLoginForm",
            },
          },
        },
        onLoginForm: {
          on: {
            proceedAsGuestUser: {
              target: "onShippingPage",
            },
            loginWithExistingUser: {
              target: "onShippingPage",
            },
          },
        },
        onShippingPage: {
          on: {
            selectHomeDelivery: {
              target: "onDeliveryAddressPage",
            },
            selectCollectInstore: {
              target: "onStoreSelectionPage",
              guard: "isCollectInStoreEnabledOnSite",
            },
          },
        },
        onDeliveryAddressPage: {
          on: {
            fillDeliveryAddress: {
              target: "onFilledShippingPage",
            },
          },
        },
        onStoreSelectionPage: {
          on: {
            selectStore: {
              target: "onFilledShippingPage",
            },
          },
        },
        onFilledShippingPage: {
          on: {
            goToPyamentPage: {
              target: "onPaymentPage",
            },
          },
        },
        onPaymentPage: {
          on: {
            selectCreditCardPayment: {
              target: "onCreditCardForm",
            },
            selectKlarnaPayment: {
              target: "onKlarnaPage",
              guard: "isKlarnaEnabledOnSite",
            },
          },
        },
        onCreditCardForm: {
          on: {
            fillCardDetails: {
              target: "onFilledPaymentPage",
            },
          },
        },
        onKlarnaPage: {
          on: {
            fillKlarnaAccount: {
              target: "onFilledPaymentPage",
            },
          },
        },
        onFilledPaymentPage: {
          on: {
            submitOrder: {
              target: "onSuccessOrderPage",
            },
          },
        },
        onSuccessOrderPage: {},
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {},
      services: {},
      guards: {
        isCollectInStoreEnabledOnSite: (context, event) => {
          return context.context.isCollectInStoreEnabled;
        },
        isKlarnaEnabledOnSite: (context, event) => {
          return context.context.isKlarnaEnabled;
        },
      },
      delays: {},
    }
  );

  model = createTestModel(this.machine);

  testParams() {
    return {
      states: {},
      events: {},
    };
  }
}

export default new CustomerJourney();
