import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  if (!token) {
    return navigateTo("/auth/login");
  }
});
