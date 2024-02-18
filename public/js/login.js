

// Function to handle login form submission
const techBlogFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get values of the username and password fields
    const username = document.querySelector("#username-tech-login").value.trim();
    const password = document.querySelector("#password-tech-login").value.trim();
    console.log(username)
    
    // If inputs include value
    if (username && password) {
        try {
            // Make a POST request to the login API endpoint
            const response = await fetch("../../api/userRoutes.js", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
        });
  
        // Check if the response is successful
        if (response.ok) {
          // Redirect to the homepage if login is successful
          document.location.replace("/");
        } else {
          // Display an alert if login failed
          alert("Failed to login.");
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
  };
  
  // Add event listener for form submission
  const techLoginForm = document.querySelector('.tech-login-form');
  if (techLoginForm) {
    techLoginForm.addEventListener('submit', techBlogFormHandler);
  }
  