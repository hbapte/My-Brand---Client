document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("LoginForm");
    const messageDiv = document.getElementById("message");
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault(); 
  
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
          messageDiv.textContent = "Login successful";
          messageDiv.style.color = "green";
  
          const token = responseData.token;
          const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
          localStorage.setItem('jwt', token);
          localStorage.setItem('expiryTime', expiryTime);
  
          window.location.href = "/admin/dashboard.html";
        } else if (response.status === 401) {

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
  
  // Function to retrieve the JWT token from localStorage
  function getToken() {
    const expiryTime = localStorage.getItem('expiryTime');
    if (!expiryTime || Date.now() > expiryTime) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('expiryTime');

      window.location.href = "/login.html?SessionExpired=true";
      return null;
    }
    return localStorage.getItem('jwt');
  }
  