import { createRouter, createWebHistory } from "vue-router";
import dashboardRoutes from "./routes/dashboard";
import studentRoutes from "./routes/students";
import authRoutes from "./routes/auth";
import guardianRoutes from "./routes/guardian";
import gradesRoutes from "./routes/grades";
import subjectsRoutes from "./routes/subjects";
import academicYearRoutes from "./routes/academicYear";
import enrollmentRoutes from "./routes/enrollments";

const routes = [
  ...dashboardRoutes,
  ...studentRoutes,
  ...authRoutes,
  ...guardianRoutes,
  ...gradesRoutes,
  ...subjectsRoutes,
  ...academicYearRoutes,
  ...enrollmentRoutes,
];

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
