import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import Users from '../components/users.vue'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: "/users",
      name: "users",
      component: Users
    }]
  }, ]
})
