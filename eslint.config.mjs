import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules
    },
    // 👇 overrides 배열을 추가하여 파일별로 규칙을 재정의합니다.
    overrides: [
      {
        // 일반 TypeScript 파일(.ts)에만 적용
        files: ['*.ts', '*.cts', '*.mts'],
        rules: {
          // 일반 함수에는 리턴 타입 규칙을 강제합니다. (경고 수준)
          '@typescript-eslint/explicit-function-return-type': 'warn',
        },
      },
      {
        // React 컴포넌트 파일(.tsx)에만 적용
        files: ['*.tsx'],
        rules: {
          // React 컴포넌트에서는 리턴 타입 규칙을 끕니다. (이미 꺼져있지만 명시적으로)
          '@typescript-eslint/explicit-function-return-type': 'off',
        },
      },
    ],
  },
  eslintConfigPrettier
)
