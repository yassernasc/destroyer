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
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'destroyer.js',
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                  importSource: '@emotion/react',
                },
              ],
            ],
            plugins: ['@emotion/babel-plugin'],
          },
        },
      },
      {
        test: /\.(png|woff2)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<html><body><div id="root"></div></body></html>`,
    }),
  ],
}

module.exports = [mainConfig, rendererConfig]
