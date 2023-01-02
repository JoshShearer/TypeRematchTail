import {
  createStructuredSelector,
  createSelector,
  selectorMemoize,
} from '#src/Models/utils';

export const defaultParams = { id: 'string' };
const selector = createStructuredSelector({
  // data: (root) => root...
});

export const CREDITOR_UNDERSCORE_NAME = selectorMemoize(
  (params: typeof defaultParams) => {
    return createSelector(selector(params), (selected) => {
      return {
        // ... derived
      };
    });
  }
);
