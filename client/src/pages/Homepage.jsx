import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = ({ posts }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4 text-white">Blog Posts</h1>
      <div className="row">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <div className="card mb-3">
                <div className="card-header bg-info">
                  <h2 className="card-title">
                    <Link to={`/post/${post.id}`} className="text-dark">
                      {post.title}
                    </Link>
                  </h2>
                </div>
                <div className="card-body text-dark">
                  <p className="card-label">
                    Created by: {post.user.username} | Date: {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </main>
  );
};

export default Homepage;
