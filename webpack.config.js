const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const copyPackageJson = new CopyPlugin({ patterns: ['package.json'] })

  const mainConfig = {
    entry: {
      main: './main',
      preload: './main/preload.js',
    },
    output: {
      path: path.join(__dirname, 'bundle'),
    },
    plugins: isProd ? [copyPackageJson] : [],
    target: 'electron-main',
  }

  const rendererConfig = {
    entry: './renderer',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['@emotion/babel-plugin'],
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    importSource: '@emotion/react',
                    runtime: 'automatic',
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.woff2$/,
          type: 'asset/resource',
        },
      ],
    },
    output: {
      filename: 'destroyer.js',
      path: path.join(__dirname, 'bundle'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: `<html><body><div id="root"></div></body></html>`,
      }),
    ],
    resolve: { extensions: ['.js'] },
    target: 'electron-renderer',
  }

  return [mainConfig, rendererConfig]
}
