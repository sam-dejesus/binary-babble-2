import { Link } from "react-router-dom";
import { format_date } from "../../utils/dateFormat";

function PostItem({ post }) {
  return (
    <div className="col-md-4">
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
            Created by: {post.author.username} | Date: {format_date(post.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

function PostList({ posts, currentPage, postsPerPage }) {
  if (posts.length === 0) {
    return <p className="text-white">No posts available.</p>;
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="row">
      {currentPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
