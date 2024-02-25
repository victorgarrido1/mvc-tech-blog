// Handler function for creating a new post
const newTechPostHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract the values of the title and content fields from the form
  const title = document.querySelector("#title-new-tech-post").value.trim();
  const content = document.querySelector("#content-new-tech-post").value.trim();

  // Check if both title and content are provided
  if (title && content) {
    // Send an HTTP POST request to the server API endpoint '/api/posts'
    const response = await fetch("/api/posts", {
      method: "POST",
      // Send the title and content as JSON in the request body
      body: JSON.stringify({ title, content }),
      // Specify the content type as JSON
      headers: { "Content-Type": "application/json" },
    });

    // Check if the response is successful (status code 200)
    if (response.ok) {
      // If successful, redirect the user to the dashboard
      document.location.replace("/dashboard/");
    } else {
      // If not successful, show an alert indicating failure to create a new post
      alert("Failed to create new post.");
      console.log(title, content);
    }
  }
};
// Event listeners
const newTechPostForm = document.querySelector(".new-tech-post-form");
if (newTechPostForm) {
  newTechPostForm.addEventListener("submit", newTechPostHandler);
}
