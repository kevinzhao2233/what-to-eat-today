import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
import Home from '../views/home/index.vue'
import Edit from '../views/edit/index.vue'
import Surprise from '../views/surprise/index.vue'
import About from '../views/about/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/edit',
        name: 'Edit',
        component: Edit
      },
      {
        path: '/surprise',
        name: 'Surprise',
        component: Surprise
      },
      {
        path: '/about',
        name: 'About',
        component: About
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
