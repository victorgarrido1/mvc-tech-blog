const techBlogFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get values of the username and password fields
    const username = document.querySelector("#username-tech-login").value.trim();
    const password = document.querySelector("#password-tech-login").value.trim();
    console.log(username)
    
    // If inputs include value
            // Make a POST request to the login API endpoint
            console.log(JSON.stringify({username, password}))
            const response = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
        });
        console.log(username, password);
  
        // Check if the response is successful
        if (response.ok) {
          // Redirect to the homepage if login is successful
          document.location.replace("/");
        } else {
          // Display an alert if login failed
          alert("Failed to login.");
        }
        
  };
  
  // Add event listener for form submission
  const techLoginForm = document.querySelector('.tech-login-form').addEventListener('submit', techBlogFormHandler);
