document.addEventListener("DOMContentLoaded", function () {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    window.location.href = "/login.html";
  }
