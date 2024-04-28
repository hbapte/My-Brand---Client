
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


  async function fetchAndDisplayBlogs() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const blogsBody = document.getElementById('blogsBody');
        const publishedBlogsCount = document.getElementById('publishedBlogsCount');
        blogsBody.innerHTML = ''; // Clear previous blogs

        let totalCount = 0;

        blogs.forEach(blog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${blog.title}</td>
                <td>${blog.tags.join(', ')}</td>
                <td>${blog.excerpt}</td>
                <td>${blog.readingTime} min</td>
                <td><img src="${blog.featuredImage}" alt="Featured Image" style="max-width: 100px;"></td>
                <td>
                    <a href="/edit/${blog._id}" class="button">Edit</a>
                    <button class="button delete-button" data-blog-id="${blog._id}">Delete</button>
                </td>
            `;
            blogsBody.appendChild(row);
            totalCount++;
        });

        // Update published blogs count
        publishedBlogsCount.textContent = totalCount;

        // Hide loader after data is loaded
        loader.style.display = 'none';
        
        // Attach event listener to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const blogId = this.dataset.blogId;
                await deleteBlog(blogId);
                // After deleting, fetch and display blogs again
                fetchAndDisplayBlogs();
            });
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        // Hide loader in case of error
        loader.style.display = 'none';
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
        // Successful deletion
        console.log('Blog deleted successfully');
    } catch (error) {
        console.error('Error deleting blog:', error);
    }
}

fetchAndDisplayBlogs(); 

