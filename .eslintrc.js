module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  plugins: [
    'prettier', '@typescript-eslint'
  ],
  rules: {
    quotes: ['error', 'single']
  },
  "overrides": [
    {
      "files": [ "src/**/*.*" ]
    }
  ]
}
