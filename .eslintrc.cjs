// import { rule } from 'postcss/lib/postcss';
module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['vue', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  rules: {
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'max-len': [
      'error',
      {
        code: 200,
        ignorePattern: '^<.*>$',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        bracketSpacing: true,
        singleQuote: true,
        printWidth: 120,
        trailingComma: 'all',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['tailwind.config.js', '**/*.test.js'],
      },
    ],
    // handle ts file extension
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
