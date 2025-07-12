import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST, DELETE_POST } from '../graphQL/mutations';
import { useNavigate } from 'react-router-dom';

const EditPost = ({ postId, initialTitle, initialContent }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const navigate = useNavigate();

  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        variables: { id: postId, title, content },
      });
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost({ variables: { id: postId } });
      navigate('/');
    } catch (err) {
      console.error('Delete failed:', err);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content-update-post" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content-update-post"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
          />
        </div>
        <button type="submit" className="btn btn-outline-info">Update Post</button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
          style={{ marginLeft: '10px' }}
        >
          Delete Post
        </button>
      </form>
    </main>
  );
};

export default EditPost;
