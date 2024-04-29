
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
  