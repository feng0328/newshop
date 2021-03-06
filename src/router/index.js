import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import Users from '../components/users.vue'
import Rights from '../components/rights.vue'
import Roles from '../components/roles.vue'
import {
  Message
} from 'element-ui';


Vue.use(Router)

const router = new Router({
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
    }, {
      path: "/rights",
      name: "rights",
      component: Rights
    }, {
      path: "/roles",
      name: "roles",
      component: Roles
    }]
  }, ]
})


router.beforeEach((to, from, next) => {
  // ...
  if (to.name === "login") {
    next()
  } else {

    const token = localStorage.getItem("token");
    if (!token) {
      Message.warning("请先登录");
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
export default router
