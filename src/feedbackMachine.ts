import { assign, setup } from 'xstate';

export const feedbackMachine = setup({
  types: {
    context: {} as { feedback: string },
    events: {} as
      | {
          type: 'feedback.good';
        }
      | {
          type: 'feedback.bad';
        }
      | {
          type: 'feedback.update';
          value: string;
        }
      | { type: 'submit' }
      | {
          type: 'close';
        }
      | { type: 'back' }
      | { type: 'restart' },
  },
  guards: {
    feedbackValid: ({ context }) => context.feedback.length > 0,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARgDsADgB0coXKkBmAVIFVZVFQF99Y1Bhy4FDAE4kAtg1b4TELHgVQSJCNTpIQTWGwc3L78CAIyMgoAnFQAbEICUXLxcnJRAmKSCGpUagpqKlJCanI5UWoasYbGaM5mFtZ2Dk4u5lhetDz+gVw8oeGRMfGJySppGRKIQkJU0QCsaloCArFqc7Fx1SAt9cgkljaOta0KAK4MEJislJ2+3ey9IYixAnkrcjJzQuvfsbFymUQqgUcyoYKoH1WsTmsjUWx2rj2B3wrW8XRYD2CoFCc1BCk+8iWazmMkWgIQugUAgW6jiURi2lk8OOu32h1gp3QNjYaLuGKCfSBxQUUh+CzUMSi8TU5KkyhBhKksXSyVJxWZplcxDIkHwljgrEwllYvMY-Me2Kmy3ysRkcqVfzBMiSstx+LSdNJcmEQhkhiMIE4njgPARuHRAUxgoQAFpYuS4xq6q4rLZ7BGeli+Ig1rEqdTFrC5TDkrLnflChotDoZHo5EmTkibBmo08EP8ovl0gsEv8KnMorLSgoqISYRUHaSG-VWAALTCcXDwPmRgVtqRUOYCEXfGufWEyUSTCkxCuqKRRBK+gdRObTrWkcgQFtry0U14j0dyXIQ6F-OVlp2BSqFWjK1gY-pAA */
  id: 'feedback',
  initial: 'prompt',
  context: {
    feedback: '',
  },
  states: {
    prompt: {
      on: {
        'feedback.good': 'thanks',
        'feedback.bad': 'form',
      },
    },
    form: {
      on: {
        'feedback.update': {
          actions: assign({
            feedback: ({ event }) => event.value,
          }),
        },
        back: { target: 'prompt' },
        submit: {
          guard: 'feedbackValid',
          target: 'thanks',
        },
      },
    },
    thanks: {},
    closed: {
      on: {
        restart: {
          target: 'prompt',
          actions: assign({
            feedback: '',
          }),
        },
      },
    },
  },
  on: {
    close: '.closed',
  },
});
