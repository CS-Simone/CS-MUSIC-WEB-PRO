document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Fetch the user data from users.json
    fetch('users.json')
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(user => user.username === enteredUsername && user.password === enteredPassword);

        if (user) {
          // Store authentication state
          localStorage.setItem("isAuthenticated", "true");
          window.location.href = "/admin.html";
        } else {
          errorMessage.textContent = "Invalid username or password. Please try again.";
          errorMessage.style.display = "block";
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
        errorMessage.style.display = "block";
      });
  });
});
