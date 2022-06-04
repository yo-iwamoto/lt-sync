module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  plugins: ['strict-dependencies'],
  rules: {
    // off
    'react/react-in-jsx-scope': 'off', // use React18
    'jsx-a11y/anchor-is-valid': 'off', // for next/link

    // custom
    'import/order': [
      'error',
      { groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'] },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'strict-dependencies/strict-dependencies': ['error', []],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: '.',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
