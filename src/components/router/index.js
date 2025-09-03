import { createRouter, createWebHistory } from "vue-router";
import dashboardRoutes from "./routes/dashboard";
import studentRoutes from "./routes/students";
import authRoutes from "./routes/auth";

const routes = [...dashboardRoutes, ...studentRoutes, ...authRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.isLogin && token) return next({ name: "dashboard" });
  if (to.meta.requiresAuth && !token) {
    next({ name: "logout" });
  } else {
    next();
  }
});

export default router;
