# Vue.jsの環境構築

## Vue CLIのインストール

```bash
sudo npm install -g @vue/cli

vue --version
```

## 新しいVue.jsプロジェクトの作成

```bash
npm create vite@latest vue-app -- --template vue-ts
cd vue-app
npm install
```

## Tailwind CSSの導入

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind CSS の設定

```js:tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Tailwind のディレクティブを追加

```css:src/assets/tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Vue Routerの設定

```bash
npm install vue-router@4
```

## Pinia の設定（オプション）

状態管理にはPiniaを使用します。

```bash
npm install pinia
```

## Fomatterの設定

```bash
npm install -D eslint prettier eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### ESLintの設定

```js:eslint.config.cjs
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
```

### Prettier の設定

```json:.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

### Prettier で無視するファイルやディレクトリを指定

```txt:.prettierignore
node_modules
dist
```

### package.jsonにコマンド追加

```json
  "scripts": {
    // (省略)
    // 以下行を追加
    "lint": "eslint \"src/**/*.{ts,vue}\"",
    "lint:fix": "eslint \"src/**/*.{ts,vue}\" --fix",
    "format": "prettier --write \"src/**/*.{ts,vue,css}\""
  },
```

### 実行コマンド

```bash
# ESLintの実行
npm run lint
# Prettierの実行
npm run format
```

## 開発サーバーの起動方法

```bash
npm run serve
```
