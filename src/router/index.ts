import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PostDetailView from "../views/PostDetailView.vue"
import UserProfileView from "../views/UserProfileView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/post/:id", component: PostDetailView },
    { path: "/user/:id", component: UserProfileView },
  ],
})

export default router