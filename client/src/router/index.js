import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/HelloWorld'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import Profile from '../components/Profile'
import LeagueOverview from '../components/LeagueOverview'
import LeagueView from '../components/LeagueView'

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
    },
    /**
     * in theory
     * /game/location(eu/us/asia)/league
     * for now hard coded dart in europe/de
     * 
     * show league overview
     */
    {
      path: '/dart/de/',
      name: 'leagueOverview',
      component: LeagueOverview
    },
    {
      path: '/dart/de/leagues/:tId',
      name: 'leagueView',
      component: LeagueView
    }
  ]
})