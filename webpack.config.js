const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = 'web/app/themes/akformations/assets'
const siteDevPath = 'http://a-k-formation.test'

module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  const config = {
    entry: {
      app: ['./assets/js/app.js', './assets/scss/app.scss']
    },
  
    output: {
      path: path.resolve(__dirname, outputPath),
      publicPath: isProduction ? './' : 'http://localhost:8000/',
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

    devServer: {
      // contentBase: path.join(__dirname, outputPath),
      // stats: 'minimal',
      // public:  siteDevPath,
      port: 8000,
      host: '0.0.0.0',
      allowedHosts: [
        'a-k-formation.test'
      ],
      
      headers: {
        "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS',
        'Access-Control-Allow-Methods': 'X-Request-With, content-type, Authorization'
      },
      // proxy: {
      //   '/api': {
      //     target: siteDevPath,
      //     changeOrigin: true,
      //     secure: false,
      //     ignorePath: true
      //   }
      // },
      hot: true
    },
  
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader'],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
                hmr: !isProduction,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                plugins: () => [require('autoprefixer')]
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
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
      new WebpackAssetsManifest({
        writeToDisk: true,
        publicPath: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    ]
  }

  if (!isProduction) config.devtool = 'source-map'

  return config
}