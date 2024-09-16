const vuePlugin = require('eslint-plugin-vue');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const vueParser = require('vue-eslint-parser');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  // 無視するファイルやディレクトリの設定
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  // Vue ファイルに適用する設定
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      // 他の Vue 固有のルールをここに追加可能
    },
  },
  // TypeScript ファイルに適用する設定
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': 'error',
      // 他の TypeScript 固有のルールをここに追加可能
    },
  },
];
