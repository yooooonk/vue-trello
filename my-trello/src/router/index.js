import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
Vue.use(VueRouter)

const routes = [
    {path:'/',component:Home},
    {path:'*',component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router