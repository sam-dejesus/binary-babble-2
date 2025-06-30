import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ posts, onDelete }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Welcome</h1>
          <Link to="/newpost" className="btn btn-outline-info">
            Create a New Blog Post
          </Link>
        </div>
      </div>
      <br />
      <h1 className="mb-4">Blog Contributions:</h1>
      {posts.map((post) => (
        <div className="post-container post mb-3" key={post.id}>
          <h2>
            <Link
              to={`/post/${post.id}`}
              className="text-decoration-none text-reset"
            >
              {post.title}
            </Link>
          </h2>
          <p>
            Created by: {post.user.username} | Date: {formatDate(post.createdAt)}
          </p>
          <Link to={`/editpost/${post.id}`} className="btn btn-outline-warning">
            Edit Post
          </Link>
          <button
            className="btn btn-outline-danger delete-post"
            onClick={() => onDelete(post.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
};

export default Dashboard;
