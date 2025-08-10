module.exports = {
  // Use the repo name for GitHub Pages project site
  publicPath: process.env.NODE_ENV === 'production' ? '/WelcomeTurf/' : '/',
  transpileDependencies: [
    'vuetify'
  ]
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
