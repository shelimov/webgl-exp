const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: { extensions: [".js", ".ts"] },
  stats: { errorDetails: true },

  plugins: [new ForkTsCheckerWebpackPlugin()],

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
      }
    ]
  },
}
