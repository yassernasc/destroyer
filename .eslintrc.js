module.exports = {
  ignorePatterns: ['bundle/', 'Destroyer-darwin-x64/'],
  overrides: [
    {
      env: { browser: true },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
      ],
      files: ['renderer/**/*.js', 'renderer/**/*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        babelOptions: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        requireConfigFile: false,
      },
      rules: {
        'react/jsx-sort-props': 'warn',
        'react/prop-types': 'warn',
      },
      settings: { react: { version: 'detect' } },
    },
    {
      env: { node: true },
      extends: ['eslint:recommended', 'plugin:node/recommended'],
      files: ['main/**/*.js'],
      parserOptions: { ecmaVersion: 2022 },
    },
  ],
  parserOptions: { ecmaVersion: 'latest' },
  root: true,
  rules: {
    curly: 'warn',
    'sort-imports': ['warn', { allowSeparatedGroups: true }],
    'sort-keys': ['warn', 'asc', { caseSensitive: false }],
  },
}
