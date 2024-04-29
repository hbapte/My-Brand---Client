document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('LoginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Get the form data
        const emailUsername = document.getElementById('email-username').value.trim();
        const password = document.getElementById('password-').value.trim();
        
        // Validate form inputs
        if (emailUsername === '') {
            showError('Email or username is required.');
            return;
        }

        if (password === '') {
            showError('Password is required.');
            return;
        }

        // Prepare the data to be sent
        const formData = {
            emailUsername: emailUsername,
            password: password
        };

        // Send a POST request to the login endpoint
        fetch('https://my-brand-oxuh.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
                    window.location.href = '/admin/dashboard.html';
                })
                .catch(() => {
                    throw new Error('Invalid JSON response');
                });
        })
        .catch(error => {
            console.error('Login error:', error);
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

    // Clear the error message after 3 seconds
    setTimeout(function () {
        errorMessageElement.textContent = '';
    }, 3000);
}
