import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/view/Login.vue'
import Personal from '@/view/Personal.vue'
import EditPersonal from '@/view/editPersonal.vue'
import Register from '@/view/Register.vue'
import Index from '@/view/Index.vue'
import ArticleDetail from '../view/articleDetail.vue'
import MyFollow from '../view/myFollow.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
    name: 'login',
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
  }, {
    name: 'Register',
    path: '/register',
    component: Register
  }, {
    name: 'Index',
    path: '/',
    component: Index
  }, {
    name: 'ArticleDetail',
    path: '/articleDetail/:id',
    component: ArticleDetail
  }, {
    name: 'MyFollow',
    path: '/myFollow',
    component: MyFollow
  }]
})

export default router
