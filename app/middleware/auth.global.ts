export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;

  if (!token && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }

  if (token && to.path === "/auth/login") {
    return navigateTo("/");
  }
});
