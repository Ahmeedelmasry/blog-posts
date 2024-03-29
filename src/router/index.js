import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "blogsPage",
    component: () => import("@/views/blogs/BlogsPage"),
  },
  {
    path: "/:blogId",
    name: "blogDetails",
    component: () => import("@/views/blogs/BlogDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
