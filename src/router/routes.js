const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/recipe/:name",
    component: () => import("components/SingleRecipe.vue"),
    name: "recipe-name"
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
