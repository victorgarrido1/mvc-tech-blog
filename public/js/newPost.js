// Handler function for creating a new post
const newTechPostHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract the values of the title and content fields from the form
  const title = document.querySelector("#title-new-tech-post").value.trim();
  const description = document.querySelector("#content-new-tech-post").value.trim();

  // Check if both title and content are provided
  if (title && description) {
    // Send an HTTP POST request to the server API endpoint '/api/posts'
    const response = await fetch("/api/posts", {
      method: "POST",
      // Send the title and content as JSON in the request body
      body: JSON.stringify({ title, description }),
      // Specify the content type as JSON
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    // Check if the response is successful (status code 200)
    if (response.ok) {
      // If successful, redirect the user to the dashboard
      document.location.replace("/dashboard");
    } else {
      // If not successful, show an alert indicating failure to create a new post
      alert("Failed to create new post.");
      console.log(response);
    }
  }
};
// Event listeners
const newTechPostForm = document.querySelector(".new-tech-post-form");
if (newTechPostForm) {
  newTechPostForm.addEventListener("submit", newTechPostHandler);
}
