const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const cssLoaderWithModules = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[hash:base64:5]',
    },
  },
}

module.exports = env => {
  return {
    mode: env.mode ?? 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'source-map', // Добавьте эту строку
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      port: 3000,
      static: {
        directory: path.join(__dirname, 'build'),
      },
      historyApiFallback: true,
      open: true,
      hot: true,
      liveReload: true,
    },
    performance: {
      hints: false,
    },
  }
}
