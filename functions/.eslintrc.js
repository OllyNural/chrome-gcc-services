module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: ['./functions/tsconfig.json', './functions/tsconfig.dev.json'],
  //   sourceType: 'module',
  // },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '.eslintrc.js'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['error'],
    'max-len': ["error", { "code": 120 }],
    'import/no-unresolved': 0,
  },
};
