import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../view/Login.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
    nane: 'login',
    path: '/login',
    component: Login
  }]
})

export default router
