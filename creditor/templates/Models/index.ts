import { createModel } from '@rematch/core';
import { RootModel, store } from '#src/Models';
import { utils_patch, utils_insert, utils_delete } from '#src/utils';
// import { APIs_robo } from '#src/Apis';

const defaultState: {
  data: {};
  status: {};
} = {
  data: {},
  status: {},
};

export const CREDITOR_UNDERSCORE_NAME = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    _set(state, payload: typeof defaultState.data) {
      return utils_patch(state, { data: payload });
    },
    _status(state, payload: typeof defaultState.status) {
      return utils_patch(state, { status: payload });
    },
    _clear() {
      return defaultState;
    },
  },
  effects: (dispatch) => {
    const reducer = () => store.actions().CREDITOR_UNDERSCORE_NAME;
    const local = () => store.state().CREDITOR_UNDERSCORE_NAME;

    return {
      async init(payload: { id?: string }) {},
    };
  },
});
