import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/HelloWorld'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import Profile from '../components/Profile'
import LeagueOverview from '../components/LeagueOverview'
import LeagueView from '../components/LeagueView'
import page404 from '../components/static/404'

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
    },
    /*
    {
      // will match anything starting with `/user-`
      // basically use it for most routes like leagues and users to show if something specific couldn't be found
      path: '/user-*'
    }

    // see https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
    // Given a route { path: '/user-*' }
    this.$router.push('/user-admin')
    this.$route.params.pathMatch // 'admin'

    // Given a route { path: '*' }
    this.$router.push('/non-existing')
    this.$route.params.pathMatch // '/non-existing'

    */
    {
      path: '*',
      name: page404,
      component: page404
    },
  ]
})