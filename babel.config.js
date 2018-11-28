/* Keyra með:
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill */

// eslint-disable-next-line no-unused-vars
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
    },
  ],
];
