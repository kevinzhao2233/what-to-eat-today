const path = require('path')

module.exports = {
  pwa: {
    name: '今天吃什么',
    themeColor: '#fa5252',
    manifestOptions: {
      background_color: '#ffffff'
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/style/variables.less')]
    }
  }
}
