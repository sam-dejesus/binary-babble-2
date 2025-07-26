import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../graphQL/queries'

const Dashboard = ({ onDelete }) => {
  
  const { loading, error, data } = useQuery(QUERY_ME);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const user = data?.me;

if (!user) {
  return <p>You must be logged in to view this page.</p>;
}

const posts = user.posts || [];

return (
  <main className="container mt-5">
    <div className="row">
      <div className="col-12">
        <h1 className="mb-4">Welcome, {user.username}</h1>
        <Link to="/newpost" className="btn btn-outline-info">
          Create a New Blog Post
        </Link>
      </div>
    </div>
    <br />
    <h1 className="mb-4">Your Blog Posts:</h1>
    {posts.length === 0 ? (
      <p>No posts found.</p>
    ) : (
      posts.map((post) => (
        <div className="post-container post mb-3" key={post.id}>
          <h2>
            <Link to={`/post/${post.id}`} className="text-decoration-none text-reset">
              {post.title}
            </Link>
          </h2>
          <p>Date: {formatDate(post.createdAt)}</p>
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
      ))
    )}
  </main>
);

};

export default Dashboard;
