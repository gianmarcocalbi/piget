// @ts-check

import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import unusedImports from 'eslint-plugin-unused-imports';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typedFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];
const recommendedTypeCheckedConfigs = /** @type {any[]} */ (
  tseslint.configs.recommendedTypeChecked
);

export default [
  eslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...recommendedTypeCheckedConfigs.map((config) => ({
    ...config,
    files: typedFiles,
    languageOptions: {
      ...config.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...config.languageOptions?.globals,
      },
      parser: tsParser,
      parserOptions: {
        ...config.languageOptions?.parserOptions,
        projectService: true,
      },
    },
  })),
  {
    files: typedFiles,
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  globalIgnores(['**/node_modules', '**/dist', '**/.astro']),
];
