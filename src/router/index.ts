import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import MessagesView from "../views/MessagesView.vue"
import LoginView from '../views/LoginView.vue'
import CreatePost from '../views/CreatePost.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView },
    { 
      path: "/", 
      name: "home",
      component: HomeView 
    },
    { 
      path: "/project/:id", 
      name: "project-detail",
      component: () => import("../views/ProjectDetailView.vue") 
    },
    { 
      path: "/user/:id", 
      name: "user-profile",
      component: () => import("../views/UserProfileView.vue") 
    },
    { 
      path: "/explore", 
      name: "explore",
      component: () => import("../views/ExploreView.vue") 
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/user/:id',
      name: 'profile',
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    }
  ],
})

//THE NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
  } 
  else if (isAuthenticated && to.name === 'login') {
    next({ name: 'home' })
  } 
  else {
    next()
  }
})

export default router