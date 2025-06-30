import React, { useState } from 'react';

const EditPost = ({ initialTitle, initialContent, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ title, content });
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4">Edit Post</h1>
      <form className="update-post-form mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title-update-post" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title-update-post"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content-update-post" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content-update-post"
            rows="3"
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" id="update-post" className="btn btn-outline-info">
          Update Post
        </button>
        <button
          type="button"
          id="delete-post"
          className="btn btn-outline-danger"
          onClick={onDelete}
          style={{ marginLeft: '10px' }}
        >
          Delete Post
        </button>
      </form>
    </main>
  );
};

export default EditPost;
