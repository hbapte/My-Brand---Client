document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('LoginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Get the form data
        const formData = new FormData(this);
        
        // Serialize the form data into JSON format
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send a POST request to the login endpoint
        fetch('https://my-brand-oxuh.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            // Attempt to parse response as JSON
            return response.json()
                .then(data => {
                    console.log('Login successful:', data);
                    // Redirect to admin.html upon successful login
                    window.location.href = 'admin.html';
                })
                .catch(() => {
                    throw new Error('Invalid JSON response');
                });
        })
        .catch(error => {
            console.error('Login error:', error);
            // Handle login failure (optional)
            showError('Login failed. Please check your credentials.');
        });
    });
});

function showError(message) {
    // Display error message to the user
    const errorMessageElement = document.getElementById('LoginSent');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    errorMessageElement.style.textAlign = 'center';

    setTimeout(function () {
        errorMessageElement.textContent = '';
    }, 3000);
}
