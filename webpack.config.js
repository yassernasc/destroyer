const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mainConfig = {
  entry: {
    main: './main',
    preload: './main/preload.js',
  },
  output: {
    path: path.join(__dirname, 'bundle'),
  },
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
        test: /\.(png|woff2)$/,
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'electron-renderer',
}

module.exports = [mainConfig, rendererConfig]
