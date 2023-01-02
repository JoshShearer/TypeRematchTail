module.exports = ({ paths = [] }) => {
  const filtered = paths.filter((item) => item.split('/').length > 1).sort();

  const _exports = filtered.map(
    (item) => `export { ${item.replace(/\//g, '_')} } from "#src/${item}";`
  );

  // routes
  const _routeImports = filtered
    .filter((item) => item.indexOf('/routes/') > 0)
    .map(
      (item) => `import { ${item.replace(/\//g, '_')} } from "#src/${item}";`
    );
  const _routes = filtered
    .filter((item) => item.indexOf('/routes/') > 0)
    .map(
      (item) => `  ${item.replace(/\//g, '_')}: ${item.replace(/\//g, '_')},`
    );

  // modals
  const _modalImports = filtered
    .filter((item) => item.indexOf('/modals/') > 0)
    .map(
      (item) => `import { ${item.replace(/\//g, '_')} } from "#src/${item}";`
    );
  const _modals = filtered
    .filter((item) => item.indexOf('/modals/') > 0)
    .map(
      (item) => `  ${item.replace(/\//g, '_')}: ${item.replace(/\//g, '_')},`
    );

  // default props
  const _defaultPropImports = filtered.map(
    (item) =>
      `import { defaultProps as ${item.replace(
        /\//g,
        '_'
      )}__props} from "#src/${item}";`
  );
  const _defaultProp = filtered.map(
    (item) =>
      `  ${item.replace(/\//g, '_')}: ${item.replace(/\//g, '_')}__props,`
  );

  // default stats
  const _defaultStateImports = filtered.map(
    (item) =>
      `import { defaultState as ${item.replace(
        /\//g,
        '_'
      )}__state} from "#src/${item}";`
  );
  const _defaultStates = filtered.map(
    (item) =>
      `  ${item.replace(/\//g, '_')}: ${item.replace(/\//g, '_')}__state,`
  );

  const _formStates = filtered
    .filter((item) => item.indexOf('/forms/') > 0)
    .map(
      (item) =>
        `  ${item.replace(/\//g, '_')}: ${item.replace(
          /\//g,
          '_'
        )}__state.fields || {},`
    );

  return [
    '/* CREDITOR_GENERATED */',
    '',
    ..._exports,
    '',
    ..._routeImports,
    '',
    ..._modalImports,
    '',
    ..._defaultStateImports,
    '',
    ..._defaultPropImports,
    '',
    'export const Routes = {',
    ..._routes,
    '};',
    '',
    'export const Modals = {',
    ..._modals,
    '};',
    '',
    'export const Forms = {',
    ..._formStates,
    '};',
    '',
    'export const defaultProps = {',
    ..._defaultProp,
    '};',
    '',
    'export const defaultState = {',
    ..._defaultStates,
    '};',
  ].join('\n');
};
