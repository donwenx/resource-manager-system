import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Download from '../views/Download.vue'
import Login from '../views/Login.vue'
import ResourceList from '../views/ResourceList.vue'
import Upload from '../views/Upload.vue'
import UserList from '../views/UserList.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/download',
    name: 'download',
    component: Download,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/resourceList',
    name: 'resourceList',
    component: ResourceList,
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
  },
  {
    path: '/userList',
    name: 'userList',
    component: UserList,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
]

const router = new VueRouter({
  routes
})

export default router
