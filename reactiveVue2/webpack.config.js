const HtmlWebpackPlugin = require('html-webpack-plugin'),
      {resolve} = require('path');

module.exports = {
      entry: './src/index.js',
      output: {
            path: resolve(__dirname, 'dist'),
            filename: 'bundle.js'
      },
      devtool: 'source-map',
      // resolve: {
      //       // 找文件先找当前文件中，再找node_modules
      //       modules: [path.resolve(__dirname, ''), path.resolve(__dirname, 'node_modules')]
      // },
      plugins: [
            new HtmlWebpackPlugin({
                  template: resolve(__dirname, 'public/index.html')
            })
      ],
      mode: 'development',
      devServer: {
            open: true
      }
}