//get the post ID from the endpoint
const post_id = window.location.pathname.split("/")[2]

//Update the post
const updateTechPostFormHandler = async (event) => {
  event.preventDefault();
  console.log(post_id);
  const title = document.querySelector(`#title-update-tech-post`).value.trim();
  const content = document
    .querySelector("#content-update-tech-post")
    .value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },

    });
 
// console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard"); //When good, load dashboard
    } else {
      alert("Failed to update post."); //When unsuccessful display alert
    }
  }
};

//Delete the post
const deleteTechPostFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete a post.");
  }
};

//Event listeners
const updateTechPostButton = document.querySelector("#update-tech-post");

if (updateTechPostButton) {
  updateTechPostButton.addEventListener("click", updateTechPostFormHandler);
}

const deleteTechPost = document.querySelector("#delete-tech-post");

if (deleteTechPost) {
  deleteTechPost.addEventListener("click", deleteTechPostFormHandler);
}