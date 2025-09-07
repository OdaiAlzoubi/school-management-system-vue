import Index from "@/views/grades/Index";

const routes = [
  {
    path: "/grade",
    name: "grades",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
