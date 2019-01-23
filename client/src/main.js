import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from './store/store'
import Panel from './components/Panels/Panel'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'

Vue.config.productionTip = false

// does not work - check vuetify why
Vue.use(Vuetify, {
  iconfont: 'fa4' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.component('panel', Panel)

sync(store, router)

new Vue({
  render: h => h(App),
  router, // we get access to this.$router
  store // we get access to this.$store
}).$mount('#app')
