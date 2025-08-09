export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");

    if (!token && to.path !== "/auth/login") {
      return navigateTo("/auth/login");
    }

    if (token && to.path === "/auth/login" || useRoute().path === "/auth/login") {
      return navigateTo("/");
    }
  }
});
