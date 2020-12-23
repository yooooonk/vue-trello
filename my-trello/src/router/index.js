import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'
import { card } from '../api'
Vue.use(VueRouter)

const requireAuth = (to,from,next)=>{        
    store.getters.isLogin? next():next('/login')
    
}
const routes = [
    {path:'/',name:'Home',component:Home,beforeEnter:requireAuth},
    {path:'/login',name:'Login',component:Login},
    {path:'/board/:bid',name:'Board',component:Board, beforeEnter:requireAuth,
            children:[{path:'card/:cid',component:card,beforeEnter:requireAuth}]},
    {path:'*',component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router

