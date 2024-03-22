import { createMachine, createActor, assign } from "xstate";

const machine = createMachine(
  {
    id: "New Machine",
    initial: "onLoginPage",
    states: {
      onLoginPage: {
        on: {
          logInWithValidCredentials: {
            target: "onAccountPage",
          },
          logInWithInvalidCredentials: {
            internal: true,
          },
        },
      },
      onAccountPage: {
        on: {
          logOut: {
            target: "onLoginPage",
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

const actor = createActor(machine);
actor.subscribe((snapshot) => {
  console.log(snapshot);
});


actor.start();
// logs 'active' with context { count: 1 }
