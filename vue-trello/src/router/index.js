import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter) //$route로 접근가능


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/b/:bid', component: Board, children:[
      {path:'c/:cid',component:Card}
  ] },  
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router