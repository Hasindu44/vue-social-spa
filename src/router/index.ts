import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
})

export default router