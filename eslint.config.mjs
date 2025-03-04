import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': eslintReactHooks,
      react: pluginReact,
      'config-prettier': eslintConfigPrettier,
      import: eslintPluginImport, // Добавляем плагин import
    },
  },
  {
    ignores: ['node_modules', 'build', 'dist'],
  },
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // React, Redux и другие внешние библиотеки
            ['internal', 'parent', 'sibling', 'index'], // Внутренние модули и компоненты
            ['object', 'type'], // Объекты и типы
          ],
          'newlines-between': 'always', // Пробелы между группами импортов
          alphabetize: { order: 'asc', caseInsensitive: true }, // Сортировка по алфавиту
        },
      ],
    },
  },
]
