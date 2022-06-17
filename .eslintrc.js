module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'import/extensions': ['error', { ts: 'never' }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 120 }],
    'operator-linebreak': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
  },
}
