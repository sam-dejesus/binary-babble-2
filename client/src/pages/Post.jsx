import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../graphQL/queries';

const Post = ({ loggedIn }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id }
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Customize as needed
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  const post = data?.getPost;

  if (!post) return <p>Post not found.</p>;
  console.log("ID from URL:", id);

  return (
    <main className="container mt-5">
      <article>
        <h1 className="title">{post.title}</h1>
        <p className="titleDate">
          Created by: {post?.author} | Date: {formatDate(post.createdAt)}
        </p>
        <p className="postBlog">{post.content}</p>
      </article>
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

      <div className="commentBox">
        <h2>Comment History:</h2>
        {post.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <div className="commentDiv mb-3" key={index}>
              <p className="commentText">{comment.comment_text}</p>
              <p className="commentDate">
                By {comment.author?.username} on {formatDate(comment.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </main>
  );
};

export default Post;
