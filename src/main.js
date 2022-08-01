import Vue from 'vue'
import App from './App.vue'
//import Start from './views/startView.vue'
import router from './router'
import store from './store'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
//Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
