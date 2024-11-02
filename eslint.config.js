import path from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const commonConfig = {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        ecmaVersion: 2020,
        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
    rules: {
        ...eslint.configs.recommended.rules,
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': [
            'error',
            {
                code: 120,
                ignoreUrls: true,
                ignoreComments: false,
                ignoreTrailingComments: true,
            },
        ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
};

const reactConfig = {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};

const tsConfig = {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            projectService: true,
            tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
        },
    },
    plugins: {
        '@typescript-eslint': tsPlugin,
    },
    rules: {
        ...tsPlugin.configs['recommended-type-checked'].rules,
        ...tsPlugin.configs['strict-type-checked'].rules,
        ...tsPlugin.configs['stylistic-type-checked'].rules,
    },
};

export default [
    commonConfig,
    reactConfig,
    tsConfig
];
