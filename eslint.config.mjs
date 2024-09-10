import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import-v9';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            '**/dist/**',
            '**/config/**',
        ],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            react: pluginReact,
            import: pluginImport,
            'react-hooks': pluginReactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'prefer-const': 'error',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-alert': 'error',
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false,
                },
            ],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        ['sibling', 'parent'],
                        'index'
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-duplicates': 'error',
            'max-len': [
                'error',
                {
                    code: 100,
                    ignoreUrls: true,
                    ignoreComments: false,
                    ignoreTrailingComments: true,
                },
            ],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            indent: ['error', 4, { SwitchCase: 1 }],
        },
    },
];
