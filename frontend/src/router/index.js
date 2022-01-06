import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Post from "../views/Post.vue";
import Settings from "../views/Settings.vue";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/me', 
    component: Profile, 
    props:true 
  },
  { 
    name: 'post',
    path: '/post', 
    component: Post, 
    props:true 
  },
  {
    name: 'settings',
    path: '/settings', 
    component: Settings, 
    props:true 
  },
 

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;