import Index from "@/views/guardian/Index";

const routes = [
  {
    path: "/guardian",
    name: "guardian",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
