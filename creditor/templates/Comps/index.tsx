import React from 'react';

import comp from '#src/Comps/utils';

export const defaultProps: {} = {};
export const defaultState: {} = {};

const selector = comp.createSel({});

export const CREDITOR_UNDERSCORE_NAME = (_props: typeof defaultProps) => {
  const props = comp.useProps(_props, defaultProps);
  const id = comp.useId('CREDITOR_UNDERSCORE_NAME', props);
  const selected = comp.useSelector(selector({}));
  const actions = comp.useDispatch();

  return (
    <div
      className="w-full h-full"
      id={id}
    >
      <p>CREDITOR_UNDERSCORE_NAME</p>
    </div>
  );
};
