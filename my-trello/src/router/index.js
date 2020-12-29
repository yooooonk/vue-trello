import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import CardDetail from '../components/CardDetail.vue'
import NotFound from '../components/NotFound.vue'
import { card } from '../api'
Vue.use(VueRouter)

const requireAuth = (to,from,next)=>{        
    store.getters.isLogin? next():next('/login')
    
}
const routes = [
    {path:'/',name:'Home',component:Home,beforeEnter:requireAuth},
    {path:'/login',name:'Login',component:Login},
    { path: '/b/:bid', component: Board, beforeEnter : requireAuth, 
            children:[{path:'c/:cid', component:CardDetail, beforeEnter : requireAuth}] },  
    {path:'*',component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router

