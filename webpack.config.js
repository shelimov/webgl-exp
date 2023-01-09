const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: { extensions: [".js", ".ts"] },
  stats: { errorDetails: true },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'WebGL Exp' }),
  ],

  module: {
    rules: [
      {
        test: /\.ts/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(vs|fs|glsl)$/,
        use: 'shader-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
