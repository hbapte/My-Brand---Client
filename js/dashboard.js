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
  


  
    async function fetchMessages() {
        try {
            const response = await fetch('https://my-brand-oxuh.onrender.com/api/messages');
            const messages = await response.json();
            const messagesBody = document.getElementById('messagesBody');

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
