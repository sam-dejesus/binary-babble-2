import React from 'react';

const NewPost = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create a Blog Contribution.</h2>
      <form className="new-post-form">
        <div className="mb-3">
          <label htmlFor="title-new-post" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title-new-post"
            placeholder="Enter a title of your choice"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content-new-post" className="form-label">Content:</label>
          <textarea
            className="form-control"
            id="content-new-post"
            rows="5"
            placeholder="Enter content here"
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
