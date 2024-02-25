const newTechCommentFormHandler = async (event) => {
  event.preventDefault();

  const postId = parseInt(window.location.pathname.split("/").pop());

  const content = document
    .querySelector("#content-tech-comment")
    .value.trim();

    console.log(postId, content);

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment_description: content, postId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      console.log("Response status:", response.status);
      console.log("Response text:", await response.text());
      alert("Failed to make a comment.");
    }
  }
};

//Event listener here
const newTechCommentForm = document.querySelector('#new-comment-form');
if (newTechCommentForm) {
    newTechCommentForm.addEventListener('submit', newTechCommentFormHandler);
}
console.log(newTechCommentFormHandler)