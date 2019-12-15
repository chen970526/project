import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../view/Login.vue'
import Personal from '../view/Personal.vue'
import EditPersonal from '../view/editPersonal.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
    nane: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'Personal',
    path: '/personal/:id',
    component: Personal
  }, {
    name: 'EditPersonal',
    path: '/editPersonal/:id',
    component: EditPersonal
  }]
})

export default router
