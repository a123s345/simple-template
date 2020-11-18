'use strict'
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = '建筑行业从业人员管理系统'
// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: process.env.VUE_APP_PORT,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: 'http://192.168.16.62:8082',
        // target: 'http://localhost:8082',
        target: process.env.VUE_APP_NETWORK,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/bpm'
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [

    ]
  },
  chainWebpack: config => {
    console.log(process.env.VUE_APP_NETWORK)
    if (process.env.NODE_ENV === 'production') {
      config.plugin('filemanager')
        .use(new FileManagerPlugin({
          onStart: {
            delete: [
              './dist',
              './dist.zip'
            ]
          },
          onEnd: {
            archive: [
              { source: './dist', destination: './dist.zip' }
            ]
          }
        }))
    }
  },
  // 全局SCSS变量导入
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/assets/style/base-style.scss";\r\n@import "~@/assets/style/mixin-style.scss";'
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
