import nx from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

const moduleBoundaryRule = [
  'error',
  {
    allow: [],
    depConstraints: [
      {
        sourceTag: 'type:app',
        onlyDependOnLibsWithTags: ['scope:shared', 'type:ui', 'type:application'],
      },
      {
        sourceTag: 'scope:desktop',
        onlyDependOnLibsWithTags: ['scope:shared', 'type:ui', 'type:application'],
      },
      {
        sourceTag: 'type:application',
        onlyDependOnLibsWithTags: ['type:domain', 'scope:shared'],
      },
      {
        sourceTag: 'type:domain',
        onlyDependOnLibsWithTags: ['type:domain', 'scope:shared'],
      },
      {
        sourceTag: 'type:infrastructure',
        onlyDependOnLibsWithTags: ['type:domain', 'type:application', 'scope:shared'],
      },
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared'],
      },
      {
        sourceTag: 'type:ui',
        onlyDependOnLibsWithTags: ['type:ui', 'scope:shared'],
      },
    ],
    enforceBuildableLibDependency: false,
  },
];

export default [
  ...nx.configs['flat/base'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    rules: {
      '@nx/enforce-module-boundaries': moduleBoundaryRule,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    rules: {
      '@nx/enforce-module-boundaries': moduleBoundaryRule,
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'apps/desktop/dist/**', 'apps/desktop/src-tauri/target/**'],
  },
];
