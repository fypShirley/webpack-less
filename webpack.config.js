const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 配置入口文件，有几个写几个
  entry:
    {
      index: './src/js/page/index.js',
      selectList:'./src/js/page/selectList.js',
      selectDetail:'./src/js/page/selectDetail.js'
    },
  output: {
    path: path.join(__dirname, 'dist'), //
    publicPath: '/',       // 模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js',     // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js'   // chunk生成的配置
  },
  devServer: {
    contentBase:'./dist/page',//本地服务 器所加载的页面所在的目录
    host: '192.168.10.32',//本机地址
    port: 1050,
    inline: true,
    hot: true,
    proxy:{
      '/api':{
        target:'http://192.168.10.227:8001',//api地址
        changeOrigin:true,
        secure:false
      },
      '/credit/images/':{
        target:'http://192.168.10.227:8001',//api地址
        changeOrigin:true,
        secure:false
      }
    }
  },
  module: {
      rules:[
        {
          test:/\.js$/,
          use: {
              loader:"babel-loader"
          },
          exclude:/node_modules/
        },
        {
          test:/(\.css|\.less)$/,
          use: ExtractTextPlugin.extract({
            use:[
              {
                loader:'css-loader',
                options:{
                  minimize:false,
                }
              },
              {
                loader:'less-loader'
              }
            ],
            fallback:'style-loader'
          })
        },
        {
          // html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
          // 比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
          test: /\.html$/,
          use:[
            {
            loader: 'html-loader',
            options:{
              attrs:[':data-src'],
              minimize:true,
              removeComments: false,
              collapseWhitespace: false
            }
          }]

        }, {
          // 文件加载器，处理文件静态资源
          test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use:[
            {
              loader: 'file-loader',
              options:{
                name:"./fonts/[name].[ext]"
              }
            }
          ]
        }, {
          // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
          // 如下配置，将小于8192byte的图片转成base64码
          test: /\.(png|jpg|gif)$/,
          use:[
            {
              loader: 'file-loader',
              options:{
                name:"./img/[name].[ext]",
                limit:8192
              }
            }
          ]
        },

      ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.ProvidePlugin({ // 加载jq
      $: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载
    /*new ExtractTextPlugin({
      filename:'index.css',
      //disable:false,
      //allChunks:true
    }),*/
    new ExtractTextPlugin('css/[name].css'),
    //new ExtractTextPlugin("css/[name]-[chunkhash:8].css",{allChunks:false}), //css样式分离
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index','selectList','selectDetail'], // 提取哪些模块共有的部分
      //minChunks: 3 // 提取至少3个模块共有的部分,
    }),
    new HtmlWebpackPlugin({
      filename: 'page/index.html', // 生成的html存放路径，相对于path
      template: __dirname + "/src/view/index.html",
      inject: true, // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值,
      chunks: ['vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'page/selectList.html', // 生成的html存放路径，相对于path
      template: __dirname + "/src/view/selectList.html",
      inject: true, // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值,
      chunks: ['vendors', 'selectList'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'page/selectDetail.html', // 生成的html存放路径，相对于path
      template: __dirname + "/src/view/selectDetail.html",
      inject: true, // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值,
      chunks: ['vendors', 'selectDetail'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    })
   /* new webpack.optimize.UglifyJsPlugin({
      mangle: {
        // 跳过这些
        except: ['$super', '$', 'exports', 'require']
      },
      compress: {
        warnings: false
      }
    }),*/

  ]

};
