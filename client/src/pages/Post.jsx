import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST } from '../graphQL/queries';
import { ADD_COMMENT } from '../graphQL/mutations';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import {format_date} from '../utils/dateFormat'

const Post = () => {
    const { loggedIn } = useContext(AuthContext);
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { id }
  });

  const [commentText, setCommentText] = useState('');
  const [createComment, { error: commentError }] = useMutation(ADD_COMMENT);


  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

  const post = data?.getPost;
  console.log(data);

  if (!post) return <p>Post not found.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      await createComment({
        variables: {
          postId: id,
          comment_text: commentText
        }
      });

      setCommentText('');
      // Refetch post to update comments
      refetch();
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  return (
    <main className="container mt-5">
      <article>
        <h1 className="title">{post.title}</h1>
        <p className="titleDate">
          Created by: {post?.author?.username} | Date: {format_date(post.createdAt)}
        </p>
        <p className="postBlog">{post.content}</p>
      </article>

      {loggedIn ? (
        <form className="new-comment-form mb-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="content-new-comment"
              rows="3"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-outline-info submitBtn">
            Submit
          </button>
          {commentError && <p className="text-danger mt-2">{commentError.message}</p>}
        </form>
      ) : (
        <p>Please log in to add comments.</p>
      )}

      <div className="commentBox">
        <h2>Comment History:</h2>
        {post.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <div className="commentDiv mb-3" key={index}>
              <p className="commentText">{comment.comment_text}</p>
              <p className="commentDate">
                By {comment.author?.username}{comment.author?.username === post?.author?.username && <span className='text-info'> OP</span>} on {format_date(comment.createdAt)}
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
