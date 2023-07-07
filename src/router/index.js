import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import { nextTick } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requireAuth: false,
      },
    },
  ],
});

// membuat middleware
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("user") == null) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name == "login") {
      if (localStorage.getItem("user") !== null) {
        next({ name: "home" });
      }
    }
    next(); 
  }
});



export default router;
