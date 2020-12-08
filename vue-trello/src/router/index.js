import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter) //$route로 접근가능


const requireAuth = (from,to,next)=>{
      const isAuth = localStorage.getItem('token')
      const loginPath = `/login?rPath=${encodeURIComponent(from.path)}`

      isAuth? next():next(loginPath)
}

const routes = [
  { path: '/', component: Home, beforeEnter : requireAuth },
  { path: '/login', component: Login},
  { path: '/b/:bid', component: Board, beforeEnter : requireAuth, children:[
      {path:'c/:cid', component:Card, beforeEnter : requireAuth}
  ] },  
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router