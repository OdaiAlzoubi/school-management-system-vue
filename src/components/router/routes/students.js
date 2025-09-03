import Index from "../../../views/students/Index.vue";
const routes = [
  {
    path: "/student",
    name: "student",
    component: Index,
    meta: { requiresAuth: true },
  },
  {
    path: "/student/onlyTrashed",
    name: "student.onlyTrashed",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
