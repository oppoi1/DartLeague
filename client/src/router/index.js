import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/HelloWorld'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})