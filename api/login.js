document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the entered username and password from the form
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Load credentials from environment variables (replace with actual values for client-side validation)
    const correctUsername = "DemoUser"; // Use process.env.ADMIN_USERNAME for backend authentication
    const correctPassword = "Demo123"; // Use process.env.ADMIN_PASSWORD for backend authentication

    // Check if the credentials match
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      // Credentials are correct, redirect to admin page
      window.location.href = "/admin.html";
    } else {
      // Credentials are incorrect, show error message
      errorMessage.textContent = "Invalid username or password. Please try again.";
      errorMessage.style.display = "block";
    }
  });
});
