import Login from "@/components/auth/Login.vue";
import api from "@/services/api";

const routes = [
  {
    path: "/login",
    name: "login",
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
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        next({
          name: "login",
          query: { logout: true },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
];

export default routes;
