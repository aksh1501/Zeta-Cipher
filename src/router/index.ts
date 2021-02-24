import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import CreateForm from '../views/CreateForm.vue'
import EditProductForm from '../views/EditProductForm.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:Pid',
    name: 'details',
    component: Details
  },
  {
    path: '/create',
    name: 'create',
    component: CreateForm
  },
  {
    path: '/edit/:Pid',
    name: 'edit',
    component: EditProductForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
