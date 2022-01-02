import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Post from "../views/Post.vue";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile/id', 
    component: Profile, 
    props:true 
  },
  { 
    name: 'post',
    path: '/post', 
    component: Post, 
    props:true 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;