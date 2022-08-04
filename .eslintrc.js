module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 'latest' },
  overrides: [
    {
      files: ['renderer/**/*.js', 'renderer/**/*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ['@babel/preset-env', '@babel/preset-react'] },
      },
      env: { browser: true },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
      ],
      settings: { react: { version: 'detect' } },
    },
    {
      files: ['main/**/*.js'],
      env: { node: true },
      extends: ['eslint:recommended', 'plugin:node/recommended'],
      parserOptions: { ecmaVersion: 2022 },
    },
  ],
  ignorePatterns: ['bundle/'],
}
