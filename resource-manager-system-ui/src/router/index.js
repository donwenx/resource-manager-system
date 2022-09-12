import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Download from '../views/Download.vue'
import Login from '../views/Login.vue'
import ResourceList from '../views/ResourceList.vue'
import Upload from '../views/Upload.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/download',
    name: 'Download',
    component: Download,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/resourceList',
    name: 'ResourceList',
    component: ResourceList,
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList,
  },
]

const router = new VueRouter({
  routes
})

export default router
