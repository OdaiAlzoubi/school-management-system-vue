const routes = [
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/users/UsersList.vue"),
    meta: {
      requiresAuth: true,
      permission: "users.view",
    },
  },
  {
    path: "/users/create",
    name: "user-create",
    component: () => import("@/views/users/UserForm.vue"),
    meta: {
      requiresAuth: true,
      permission: "users.create",
    },
  },
  {
    path: "/users/:id/edit",
    name: "user-edit",
    component: () => import("@/views/users/UserForm.vue"),
    meta: {
      requiresAuth: true,
      permission: "users.edit",
    },
  },
  {
    path: "/users/:id",
    name: "user-view",
    component: () => import("@/views/users/UserView.vue"),
    meta: {
      requiresAuth: true,
      permission: "users.view",
    },
  },
];

export default routes;
