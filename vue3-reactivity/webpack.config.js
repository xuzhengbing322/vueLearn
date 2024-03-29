const HtmlWebpackPlugin = require('html-webpack-plugin'),
      {resolve} = require('path');

module.exports = {
      entry: './src/index.js',
      output: {
            path: resolve(__dirname, 'dist'),
            filename: 'bundle.js'
      },
      devtool: 'source-map',
      plugins: [
            new HtmlWebpackPlugin({
                  template: resolve(__dirname, 'src/index.html')
            })
      ],
      mode: 'development'
      // devServer: {
      //       contentBase: './'
      // }
}