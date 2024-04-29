
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}


function toggleSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar_responsive");
      sidebarOpen = true;
    } else {
      sidebar.classList.remove("sidebar_responsive");
      sidebarOpen = false;
    }
  }

       // Check if the user has a login token when the page loads
       document.addEventListener('DOMContentLoaded', function () {
        const token = getTokenFromCookie(); // Get the login token from cookie
        if (!token) {
            // Redirect to the login page if the token is not present
            redirectToLogin();
        }
    });

    // Function to get the login token from cookie
    function getTokenFromCookie() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
        const tokenCookie = cookies.find(cookie => cookie[0] === 'token');
        return tokenCookie ? tokenCookie[1] : null;
    }

    // Function to redirect to the login page
    function redirectToLogin() {
        // Redirect to the login page URL
        window.location.href = '/login.html?sessionExpired=true';
    }
  

  async function fetchAndDisplayPublishedBlogsCount() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const publishedBlogsCount = document.getElementById('publishedBlogsCount');
        publishedBlogsCount.textContent = blogs.length;
    } catch (error) {
        console.error('Error fetching published blogs count:', error);
        publishedBlogsCount.textContent = 'Error';
    }
}

fetchAndDisplayPublishedBlogsCount(); // Fetch and display published blogs count when the page loads

// Update the JavaScript code
async function fetchAndDisplayMessagesCount() {
    try {
      const response = await fetch('https://my-brand-oxuh.onrender.com/api/contact');
      const messages = await response.json();
      const totalMessagesCount = messages.length; // Get the total number of messages
      const totalMessagesCountElement = document.getElementById('totalMessagesCount');
      totalMessagesCountElement.textContent = totalMessagesCount;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
  
  // Call the function when the page loads
  window.addEventListener('load', () => {
    fetchAndDisplayMessagesCount();
  });
  