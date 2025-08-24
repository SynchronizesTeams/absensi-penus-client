export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");

    if (!token && to.path !== "/login") {
      return navigateTo("/login");
    }

    if (token && to.path === "/login") {
      return navigateTo("/");
    }
  }
});