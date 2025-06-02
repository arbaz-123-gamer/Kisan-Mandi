function validateSignup(event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("All fields are required!");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  fetch("http://127.0.0.1:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm_password: confirmPassword,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "An unknown error occurred.");
        });
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      alert(data.message);
      if (data.message === "User created successfully!") {
        window.location.href = "/login.html";
      }
    })
    .catch((error) => {
      console.error("Error during signup:", error);
      alert("Signup failed: " + error.message);
    });
}

function validateSignin(event) {
  event.preventDefault();

  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  if (username === "" || password === "") {
    alert("All fields are required!");
    return false;
  }

  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Login failed.");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      if (data.message === "Login successful!") {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Error during signin:", error);
      alert("Login failed: " + error.message);
    });
}
