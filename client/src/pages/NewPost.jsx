import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphQL/mutations';

const NewPost = () => {
  const navigate = useNavigate();

  // Store post title and content in state
  const [formState, setFormState] = useState({ title: '', content: '' });

  const [createPost, { error }] = useMutation(CREATE_POST);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send variables from formState
      const { data } = await createPost({
        variables: { ...formState }
      });

      // After success, navigate somewhere
      navigate('/homepage');
    } catch (err) {
      console.error('Create post failed:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create a Blog Contribution.</h2>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title-new-post" className="form-label">Title:</label>
          <input
            type="text"
            id="title-new-post"
            name="title"
            value={formState.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter a title of your choice"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content-new-post" className="form-label">Content:</label>
          <textarea
            id="content-new-post"
            name="content"
            value={formState.content}
            onChange={handleChange}
            className="form-control"
            rows="5"
            placeholder="Enter content here"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Create Post</button>
        </div>
      </form>
      {error && <p className="text-danger">Error creating post: {error.message}</p>}
    </div>
  );
};

export default NewPost;
