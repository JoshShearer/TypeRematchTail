module.exports = ({ paths = [] }) => {
  const filtered = paths.filter((item) => item.split('/').length > 1).sort();

  const _imports = filtered.map(
    (item) => `import {${item.replace(/\//g, '_')}} from "#src/${item}";`
  );

  const _leuy = filtered.map(
    (item) => `  ${item.replace(/\//g, '_')}: ${item.replace(/\//g, '_')},`
  );

  return [
    '/* CREDITOR_GENERATED */',
    '',
    ..._imports,
    '',
    'export const Icons = {',
    ..._leuy,
    '};',
    '',
  ].join('\n');
};
