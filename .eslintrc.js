module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'class-methods-use-this': 0,
    'linebreak-style': 0
  },
  plugins: ['import'],
};
