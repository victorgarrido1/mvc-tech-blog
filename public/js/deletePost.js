const deletedPost = async (post_id) => {
  try {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Code to handle successful response
      console.log(response);
    } else {
      // Code to handle unsuccessful response
      throw new Error("Failed to delete the post.");
    }
  } catch (error) {
    // Code to handle network errors or other exceptions
    alert("Failed to delete the post.");
    console.log(error);
  }
};

const deletePostHandler = (event) => {
  if (event.target.matches(".delete-post")) {
    const post_id = event.target.getAttribute("data-post-id");
    deletedPost(post_id); // Changed function call to deletedPost
  }
};

document.addEventListener("click", deletePostHandler);
