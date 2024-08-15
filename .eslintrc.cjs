// import { rule } from 'postcss/lib/postcss';
module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
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
  },
};
