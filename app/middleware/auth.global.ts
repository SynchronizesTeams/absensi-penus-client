export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  if (!token && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }

  if ((to.path === "/auth/login" && token) || token) {
    return navigateTo("/");
  }
});
