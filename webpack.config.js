const path = require('path')
const assetsManifest = require('webpack-assets-manifest')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const outputPath = 'web/app/themes/akformations/assets'

module.exports = env => {
  const isProduction = env == 'production'

  return {
    entry: {
      app: ['./assets/js/app.js', './assets/scss/app.scss']
    },
  
    output: {
      path: path.resolve(__dirname, outputPath),
      publicPath: isProduction ? './' : 'http://localhost/a-k-formations/web/',
      filename: isProduction ? '[name].[hash].js' : '[name].js'
    },
  
    resolve: {
      modules: [path.resolve(__dirname, './'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'assets'),
        '~': path.resolve(__dirname, 'node_modules'),
      },
    },
  
    stats: 'minimal',
    externals: {
      'jquery': 'jQuery'
    },
  
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: !isProduction,
                },
              },
            ],
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: !isProduction,
                  importLoaders: 1,
                  minimize: isProduction,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: !isProduction,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: !isProduction,
                },
              },
            ],
          }),
        },
        // {
        //   test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        //   use: [{
        //     loader: 'file-loader',
        //     options: {
        //       name: `[name]${!isProduction ? '' : '.[hash]'}.[ext]`,
        //       useRelativePath: isProduction,
        //     },
        //   }],
        // },
      ],
    },
  
    plugins: [
      new assetsManifest({
        writeToDisk: true,
        publicPath: true
      })
    ]
  }
}