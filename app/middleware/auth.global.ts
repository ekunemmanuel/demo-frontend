export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("tokens").value;
  const isLoginPage = to.path === "/login";
  const isDashboardPage = to.path === "/dashboard";
  // redirect the user to the login screen if they're not authenticated and trying to access the dashboard
  if (!token && isDashboardPage) {
    return navigateTo("/login");
  }

  // redirect authenticated users to the dashboard if they try to access the login or register page
  if (token && isLoginPage) {
    return navigateTo("/dashboard");
  }
});
