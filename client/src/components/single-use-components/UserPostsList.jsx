import { Link } from "react-router-dom";
import { format_date } from "../../utils/dateFormat";

function PostItem({ post, onDelete }) {
  return (
    <div className="post-container post mb-3" key={post.id}>
      <h2>
        <Link to={`/post/${post.id}`} className="text-decoration-none text-reset">
          {post.title}
        </Link>
      </h2>
      <p>Date: {format_date(post.createdAt)}</p>
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
  );
}


function UserPostsList({ posts, onDelete }) {
  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return posts.map((post) => (
    <PostItem key={post.id} post={post} onDelete={onDelete} />
  ));
}
export default UserPostsList;