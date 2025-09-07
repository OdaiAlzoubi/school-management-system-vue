import Index from "@/views/subjects/Index";

const routes = [
  {
    path: "/subjects",
    name: "subjects",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
