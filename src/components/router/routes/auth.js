import Login from "@/components/auth/Login.vue";
import api from "@/services/api";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isLogin: true },
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: async (to, from, next) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await api.post("/logout");
        }
        // setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        next({
          name: "Login",
          query: { logout: true },
        });
        // }, 100);
      } catch (error) {
        console.error(error);
      }
    },
  },
];

export default routes;
