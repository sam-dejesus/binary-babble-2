// create new post
const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-new-post').value.trim();
    const content = document.querySelector('#content-new-post').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); 
      } else {
        alert('Failed to create a new post.'); 
      }
    }
  };
  
 
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newPostFormHandler);
  }

 
const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  
 // updates Post
  const updatePostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title-update-post").value.trim();
    const content = document
      .querySelector("#content-update-post")
      .value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");  
      } else {
        alert("Failed to update a post.");  
      }
    }
  };
  
  // Delete the post
  const deletePostFormHandler = async (event) => {
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
  
 //update post in dashboard
  const updatePostButton = document.querySelector("#update-post");
  
  if (updatePostButton) {
    updatePostButton.addEventListener("click", updatePostFormHandler);
  }
  // delete post dashboard
  const deletePostButton = document.querySelector("#delete-post");
  
  if (deletePostButton) {
    deletePostButton.addEventListener("click", deletePostFormHandler);
  }

  
  const deletePost = async (post_id) => {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.reload(); 
    } else {
      alert("Failed to delete the post.");  
    }
  };
  
  const deletePostHandler = (event) => {
    if (event.target.matches(".delete-post")) {
      const post_id = event.target.getAttribute("data-post-id");
      deletePost(post_id);
    }
  };
  
  document.addEventListener("click", deletePostHandler);

  
  const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    const content = document.querySelector('#content-new-comment').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();  
      } else {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        alert('Failed to create a comment.');  
      }
    }
  };
  
  
  
 
  const newCommentForm = document.querySelector('.new-comment-form');
  if (newCommentForm) {
    newCommentForm.addEventListener('submit', newCommentFormHandler);
  }
  