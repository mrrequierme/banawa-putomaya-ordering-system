import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import LandingPage from "@/views/guest/LandingPage.vue";
import AdminOrder from "@/views/admin/orders/Order.vue";
import AdminProduct from "@/views/admin/products/ProductList.vue";
import AdminHistory from "@/views/admin/histories/History.vue";
import AdminUser from "@/views/admin/users/User.vue";
import UserOrders from "@/views/user/orders/Order.vue";
import UserProducts from "@/views/user/products/Products.vue";

const routes = [
  { path: "/", name: "Landing", component: LandingPage },
  { path: "/login", name: "Login", component: Login, meta: { title: "Login" } },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" },
  },

  {
    path: "/admin/orders",
    name: "AdminOrders",
    component: AdminOrder,
    meta: {
      roles: ["admin", "staff"],
      requiresAuth: true,
      title: "Orders",
    },
  },
  {
    path: "/admin/users",
    name: "AdminUser",
    component: AdminUser,
    meta: { roles: ["admin", "staff"], requiresAuth: true, title: "Users" },
  },
  {
    path: "/admin/users/create",
    name: "AdminUserCreate",
    component: () => import("@/views/admin/users/Create.vue"),
    meta: { roles: ["admin"], requiresAuth: true, title: "Create Staff" },
  },
  {
    path: "/admin/history",
    name: "AdminHistory",
    component: AdminHistory,
    meta: { roles: ["admin", "staff"], requiresAuth: true, title: "History" },
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: AdminProduct,
    meta: { roles: ["admin", "staff"], requiresAuth: true, title: "Products" },
  },
  {
    path: "/admin/products/add",
    name: "AddProduct",
    component: () => import("@/views/admin/products/AddProduct.vue"),
    meta: {
      roles: ["admin", "staff"],
      requiresAuth: true,
      title: "Add Product",
    },
  },
  {
    path: "/admin/products/edit/:id",
    name: "EditProduct",
    component: () => import("@/views/admin/products/EditProduct.vue"),
    meta: {
      roles: ["admin", "staff"],
      requiresAuth: true,
      title: "Edit Product",
    },
  },
  {
    path: "/orders",
    name: "UserOrders",
    component: UserOrders,
    meta: { roles: ["user"], requiresAuth: true, title: "Orders" },
  },
  {
    path: "/products",
    name: "UserProducts",
    component: UserProducts,
    meta: { roles: ["user"], requiresAuth: true, title: "Products" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.user) {
    return next("/login");
  }

  if (to.meta.roles) {
    if (!auth.user) return next("/login");

    if (!to.meta.roles.includes(auth.role)) {
      if (auth.role === "user") {
        //This is for popup sweet alert
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: "You don’t have permission to access this page.",
          confirmButtonColor: "#3085d6",
        });
        return next("/orders");
      }
      if (auth.role === "admin" || auth.role === "staff") {
        //This is for popup sweet alert
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: "You don’t have permission to access this page.",
          confirmButtonColor: "#3085d6",
        });

        return next("/admin/orders");
      }

      return next("/");
    }
  }

  next();
});

router.afterEach((to) => {
  const defaultTitle = "Putomaya sa Banawa";
  document.title = to.meta.title
    ? `${to.meta.title} | ${defaultTitle}`
    : defaultTitle;
});
export default router;
