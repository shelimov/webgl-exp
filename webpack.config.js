const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['babel-preset-env'] }
        }
      },
      {
        test: /\.(vs|fs|glsl)$/,
        exclude: /node_modules/,
        use: 'shader-loader'
      },
    ]
  }
}
