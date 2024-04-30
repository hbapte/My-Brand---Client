document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("LoginForm");
    const messageDiv = document.getElementById("message");
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission
  
      const formData = new FormData(loginForm);
      const formDataJSON = {};
      formData.forEach((value, key) => {
        formDataJSON[key] = value;
      });
  
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formDataJSON)
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          // Successful login
          messageDiv.textContent = "Login successful";
          messageDiv.style.color = "green";
          // Redirect to dashboard or any other page
          window.location.href = "/admin/dashboard.html";
        } else if (response.status === 401) {
          // User not found, wrong password, or unverified email
          if (responseData.error === 'User not found') {
            messageDiv.textContent = 'User not found';
          } else if (responseData.error === 'Please verify your email before logging in') {
            messageDiv.textContent = 'Please verify your email before logging in';
          } else {
            messageDiv.textContent = 'Wrong password';
          }
          messageDiv.style.color = "red";
        } else {
          // Other errors
          messageDiv.textContent = responseData.error || "An error occurred";
          messageDiv.style.color = "red";
        }
      } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = "An error occurred";
        messageDiv.style.color = "red";
      }
    });
  });
  

  function myFunction() {
    var x = document.getElementById("password-");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 

  document.addEventListener('DOMContentLoaded', function () {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
  const tokenCookie = cookies.find(cookie => cookie[0] === 'token');
  if (tokenCookie) {
    window.location.href = '/admin/dashboard.html'; // Redirect to task page
  }
});