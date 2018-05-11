const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
        {
            test:    /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            loader:  'elm-webpack-loader?verbose=true&warn=true',
        },
    ],
      noParse: /\.elm$/,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.elm'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
