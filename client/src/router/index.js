import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/HelloWorld'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import Profile from '../components/Profile'

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
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: Profile
    }
  ]
})