import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#4CAF50',
        secondary: '#00BCD4',
        accent: '#FFB300',
        error: '#E53935',
        info: '#2196F3',
        success: '#43A047',
        warning: '#FB8C00'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})


