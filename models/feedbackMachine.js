import { assign, createMachine } from "xstate";
import { getSimplePaths, createTestModel } from "@xstate/graph";

export const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxKhjrgHTYA2A9rGANoAMAuoqAA40CWALp1QHasQAD0QAWAEwAaEAE9EARgDsADlJKGAZgUSGK7WM0qGSgL6mZRCFjyk2AJyoBbNt0JprJUlCpUIjFiQQDlgePkEg0QQAVhU1BgBOTSVNaIA2FTFjMRl5BE0tUl1tCU0JBIVNCrTzSw8bMgdnV3diWyx-ZiEQsIEhKNj4pJT0zOzcxAldUhUJFR0xaIlKjNTakCsG0mQqeydWz1sAVzYITG56LqCe3j7IxCVo6NIqhjTKsQUEsTSlHLlEPNSNEGKCGBIlEo0uUtGJ1psvDs9vgGgFulxbhFQFE0tDSApEpo0lp9CposoJghlAwXnMFF9iQofpV4fVEbt9rAjugnDw0dcMeF+ogkmlSBk-plQfNoilKQpZqRFiU9AYjCZWW0yJQaJB8PY4NxMPZuPz2IK7tjEKkxC8GD99AkEiZJBI0vLVOotDpVUz1WZ1vw-HAhAi8OjQpjhQgALTugGxsVgsFPJmPMpwiwbNm2JoubgR3pYkTiXFK6LaFYQhW4j0JIre3T6P3GAN1LXbDmFqP3BDGCSkQkpZKQgo6eWKhIVn3NwytzWHMjcAAWmH4uHgAsjQt7BLE9dlxgSKidpQS0gTXxpxR0CjS5NdsQXWx1tAg3Z3VoQyyTJQr6SUc9NA9JRSCnAopz9e072icxzCAA */
    id: "feedback",
    initial: "prompt",
    context: {
      feedback: "",
    },
    states: {
      prompt: {
        on: {
          "feedback.good": "thanks",
          "feedback.bad": "form",
          "feedback.close": "closed",
        },
      },
      form: {
        on: {
          "feedback.update": {
            actions: assign({
              feedback: "OK",
            }),
          },
          "feedback.close": "closed",
          back: "prompt",
          submit: {
            guard: "feedbackValid",
            target: "thanks",
          },
        },
      },
      thanks: {},
      closed: {
        type: "final",
        on: {
          restart: "prompt",
        },
      },
    },
  },
  {
    guards: {
      feedbackValid: ({ context }) => context.feedback.length === 0,
    },
  }
);

export const feedbackModel = createTestModel(feedbackMachine);

export const feedbackPaths = getSimplePaths(feedbackMachine);
