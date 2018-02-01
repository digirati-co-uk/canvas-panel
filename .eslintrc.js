'use strict';

/**
 * Clone of: https://github.com/digirati-co-uk/fesk/blob/master/.eslintrc.js
 *
 * For changes, please change that source or open support ticket.
 */

const OFF = 0;
const ERROR = 2;

module.exports = {
  // Stop ESLint from looking for a configuration file in parent folders
  root: true,
  extends: ['plugin:flowtype/recommended'],

  plugins: ['prettier', 'flowtype'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'no-undef': OFF,
    'no-use-before-define': OFF,

    'prettier/prettier': ERROR,
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs'],
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    indent: OFF,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': ERROR,
    'no-unused-expressions': ERROR,
    'no-useless-concat': OFF,
    'flowtype/no-types-missing-file-annotation': OFF,
    quotes: [
      ERROR,
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
  },
};
