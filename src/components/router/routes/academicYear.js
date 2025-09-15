import Index from "@/views/academicYear/Index.vue";
const routes = [
  {
    path: "/academic-year",
    name: "academic_year",
    component: Index,
    meta: { requiresAuth: true },
  },
];

export default routes;
