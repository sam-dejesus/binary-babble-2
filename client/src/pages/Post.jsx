import React from 'react';

const Post = ({ title, content, createdAt, user, loggedIn, comments }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Customize as needed
  };

  return (
    <main className="container mt-5">
      <article>
        <h1 className="title">{title}</h1>
        <p className="titleDate">
          Created by: {user.username} | Date: {formatDate(createdAt)}
        </p>
        <p className="postBlog">{content}</p>
      </article>

      {loggedIn && (
        <form className="new-comment-form mb-3">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="content-new-comment"
              rows="3"
              placeholder="Add a comment..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline-info submitBtn">
            Submit
          </button>
        </form>
      )}

      <div className="commentBox">
        <h2>Comment History:</h2>
        {comments.map((comment, index) => (
          <div className="commentDiv mb-3" key={index}>
            <p className="commentText">{comment.comment_text}</p>
            <p className="commentDate">
              By {comment.user.username} on {formatDate(comment.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;
