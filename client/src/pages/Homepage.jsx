import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_POSTS } from '../graphQL/queries';
import PostList from '../components/single-use-components/PostList';

const Homepage = () => {
  const { loading, data } = useQuery(QUERY_ALL_POSTS);
  const posts = data?.getAllPosts || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; 

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Function to change page
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4 text-white">Blog Posts</h1>

      {loading ? (
        <p className="text-white">Loading posts...</p>
      ) : (
        <>
          <PostList
            posts={posts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
          />

          {/* Pagination controls */}
          <nav className="mt-4">
            <ul className="pagination justify-content-end">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </main>
  );
};

export default Homepage;
