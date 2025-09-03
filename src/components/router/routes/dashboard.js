import Dashboard from "@/views/dashboard/Dashboard.vue";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      permission: "dashboard.view",
    },
  },
];

export default routes;
