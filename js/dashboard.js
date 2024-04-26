  
  // Function to toggle sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
  }
  
  // Function to close sidebar
  function closeSidebar() {
    document.getElementById("sidebar").classList.remove('active');
  }
  
  
  
  
  // Function to fetch and display messages from API
async function fetchAndDisplayMessages() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/contact');
        const messages = await response.json();
        const messagesBody = document.getElementById('messagesBody');
        messagesBody.innerHTML = ''; // Clear previous messages

        messages.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.names}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
            `;
            messagesBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Function to fetch and display published blogs from API
async function fetchAndDisplayBlogs() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const blogsBody = document.getElementById('blogsBody');
        blogsBody.innerHTML = ''; // Clear previous blogs

        blogs.forEach(blog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.content}</td>
                <td>${blog.author}</td>
                <td>
                    <a href="/edit/${blog._id}" class="button">Edit</a>
                    <button onclick="deleteBlog('${blog._id}')" class="button delete-button">Delete</button>
                </td>
            `;
            blogsBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

// Event listener for the "Messages" tab
document.getElementById('messages-tab').addEventListener('click', function() {
    openTab('messages'); // Switch to the "Messages" tab
    fetchAndDisplayMessages(); // Fetch and display messages
});

// Event listener for the "Published Blogs" tab
document.getElementById('blogs-tab').addEventListener('click', function() {
    openTab('blogs'); // Switch to the "Published Blogs" tab
    fetchAndDisplayBlogs(); // Fetch and display blogs
});

  
  
  // Sidebar Toggle Codes;
  
  
  
  
  
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

  // Function to switch between tabs
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    
    // Deactivate all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Activate the selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
}

async function fetchAndDisplayBlogs() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const blogsBody = document.getElementById('blogsBody');
        blogsBody.innerHTML = ''; // Clear previous blogs

        blogs.forEach(blog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.content}</td>
                <td>${blog.author}</td>
                <td>
                    <a href="/edit/${blog._id}" class="button">Edit</a>
                    <button class="button delete-button" data-blog-id="${blog._id}">Delete</button> <!-- Add data-blog-id attribute -->
                </td>
            `;
            blogsBody.appendChild(row);
        });

        // Attach event listener to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const blogId = this.dataset.blogId;
                deleteBlog(blogId);
            });
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}


  


  async function fetchMessages() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/contact');
        const messages = await response.json();
        const messagesBody = document.getElementById('messagesBody');
        const totalMessages = messages.length; // Calculate total number of messages

        // Display total number of messages in the dashboard
        document.getElementById('totalMessages').innerText = totalMessages;

        messages.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.names}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
            `;
            messagesBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function fetchBlogs() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const blogsBody = document.getElementById('blogsBody');
        const totalBlogs = blogs.length; // Calculate total number of blogs

        // Display total number of blogs in the dashboard
        document.getElementById('totalBlogs').innerText = totalBlogs;

        blogs.forEach(blog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.content}</td>
                <td>${blog.author}</td>
                <td>
                    <a href="/edit/${blog._id}" class="button">Edit</a>
                    <button onclick="deleteBlog('${blog._id}')" class="button delete-button">Delete</button>
                </td>
            `;
            blogsBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}



    async function deleteBlog(blogId) {
        try {
            const response = await fetch(`https://my-brand-oxuh.onrender.com/api/blogs/${blogId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            // Reload the dashboard after deleting the blog
            location.reload();
        } catch (error) {
            console.error('Error deleting blog:', error);
            // Handle error: display error message to the user
        }
    }

    // Call functions to fetch messages and blogs when the page loads
    window.onload = function() {
        fetchMessages();
        fetchBlogs();
    };


    // Call fetchAndDisplayMessages function when the page loads
window.onload = function() {
    fetchAndDisplayMessages();
};