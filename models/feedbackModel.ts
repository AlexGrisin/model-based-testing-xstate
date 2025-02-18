import { assign, createMachine } from 'xstate';
import { createTestModel } from '@xstate/graph';

export const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAA4BOA9gLaEAuAxCRdflKaRANoAMAuoqIabACWVQaQB2vEAA9EARgBsAZnzyALB3kAmTQE4OAVnkB2ABybVAGhABPRCdn59HZwYX7Vikzv0BfH1dQMHAJ6SlpQxix2bkl+IRFxSRkEBWU1DW09Q1NzK1sERWd8Iw5FWVVzVXknJT8AtAgsPCIyMLpWxmwAGwEwTh4kEDjhUQlB5NSVdS1dA2MzSxtEd2VNUoUjTY5ZRR06kEDG4PxDptwAMVJichpT4Mvr-ABXQghMKj6YweGEsdBkxTVfAmfQ6RSbRSqUweEzyPKINaafCaJzOcyydyqfSw-Z3Zp4i5XG4Eh7kfDdXr9WICEaJcbLEzKExGJxrYwaEwVeEFDg6FSyHT2TlGWQcVRmRS4hpnE7S+5E25yvCk-BnKnfGm-JJyJRTDKzbILbkojjI9ZQnRVVQ6FG+fwHJUEEkK52PWBPdDkYTqvia0bahDYpksjhskryTmaY2g-CyAUSnQi0qqVRSoLNCmwSA0TOQfDEOBUTDEKg+oZ+un-RAskz4RSaeyQzRNgzcipIrFlEr6NY7Nl+e1iVhwSQE6nxf30hAAWjhSxn+nwOmXK9Xq8l9oJLQYVHHtL+0kQXPnhQcazKFRT1Q0G-q6adjtJe61U92i-0RnbHjUJkZ3MKyglGUcYzL+LJpkczRUAAFpgYi4AAmqQTzPpOVYIGCyiihilqaPICiMlG84okigKCuYYHyIKmwQTKuYQKhlaHhhihYdsoIVPhEb1ty+j1maZSMgsybyAOPhAA */
    id: 'feedback',
    initial: 'prompt',
    context: {
      feedback: '',
    },
    states: {
      prompt: {
        on: {
          'prompt.good': 'thankYou',
          'prompt.bad': 'feedbackForm',
          'prompt.close': 'closed',
        },
      },
      feedbackForm: {
        on: {
          'feedbackForm.fill': {
            actions: assign({
              feedback: 'OK',
            }),
          },
          'feedbackForm.close': 'closed',
          'feedbackForm.back': 'prompt',
          'feedbackForm.submit': {
            actions: assign({
              feedback: 'OK',
            }),
            guard: 'feedbackValid',
            target: 'thankYou',
          },
        },
      },
      thankYou: {},
      closed: {
        type: 'final',
        on: {
          'closed.restart': 'prompt',
        },
      },
    },
  },
  {
    guards: {
      feedbackValid: ({ context }) => context.feedback === 'OK',
    },
  },
);

export const feedbackModel = createTestModel(feedbackMachine);
