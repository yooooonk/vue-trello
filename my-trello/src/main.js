import Vue from 'vue'
import App from './App.vue'
import router from './router'
import style from './css/style.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})