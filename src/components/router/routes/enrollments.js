import Index from "@/views/enrollments/Index";
const routes = [
  {
    path: "/enrollments",
    name: "enrollments",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
