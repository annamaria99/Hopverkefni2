/* Keyra með:
npm install --save-dev rollup
npm install --save-dev rollup
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev rollup-plugin-babel
*/

import babel from 'rollup-plugin-babel';

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({
      sourceMaps: true,
      presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
    }),
  ],
};
