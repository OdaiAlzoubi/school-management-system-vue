import Index from "@/views/grades/Index";
import Show from "@/views/grades/Show";

const routes = [
  {
    path: "/grade",
    name: "grades",
    component: Index,
    meta: { requiresAuth: true },
  },
  {
    path: "/grade/:id",
    name: "grades.show",
    component: Show,
    meta: { requiresAuth: true },
  },
];

export default routes;
