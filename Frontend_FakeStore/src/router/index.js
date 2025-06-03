import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductForm from "@/views/ProductForm.vue";
import LoginView from "@/views/LoginView.vue";
import authService from "../services/authService"; 

const routes = [
  { path: "/", component: ProductList },
  { path: "/product/:id", component: ProductDetail, props: true },
  { path: "/login", component: LoginView },
  { path: "/create", component: ProductForm, meta: { requiresAuth: true } },
  { path: "/edit/:id", component: ProductForm, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Globaler Auth-Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = !!(to.meta && to.meta.requiresAuth);

  if (requiresAuth && !authService.isLoggedIn()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
