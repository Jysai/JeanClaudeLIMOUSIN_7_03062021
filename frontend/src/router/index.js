import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Feed from "../views/Feed.vue";
import Settings from "../views/Settings.vue";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/user', 
    component: Profile, 
    props:true 
  },
  { 
    name: 'feed',
    path: '/feed', 
    component: Feed, 
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