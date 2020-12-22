import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
Vue.use(VueRouter)

const requireAuth = (to,from,next)=>{
        
    store.getters.isLogin? next():next('/login')
    
}
const routes = [
    {path:'/',name:'Home',component:Home,beforeEnter:requireAuth},
    {path:'/login',name:'Login',component:Login},
    {path:'*',component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router

