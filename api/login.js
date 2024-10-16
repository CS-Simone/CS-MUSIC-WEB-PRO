document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Hardcoded credentials for demonstration (replace with your method)
    const correctUsername = "DemoUser"; // Replace with env variable
    const correctPassword = "Demo123"; // Replace with env variable

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/admin.html";
    } else {
      errorMessage.textContent = "Invalid username or password. Please try again.";
      errorMessage.style.display = "block";
    }
  });
});
