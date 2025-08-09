import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../graphQL/queries';
import { DELETE_POST } from '../graphQL/mutations';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import UserPostsList from '../components/single-use-components/UserPostsList';


const Dashboard = () => {
  const { loggedIn } = useContext(AuthContext);
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [deletePost] = useMutation(DELETE_POST);


  const handleDelete = async (id) => {
    try {
      await deletePost({
        variables: { id },
      });
      await refetch(); // Refresh posts after deletion
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me;

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  const posts = user.posts || [];

return (
    <>
      {loggedIn ? (
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
          <UserPostsList posts={posts} onDelete={handleDelete} />
        </main>
      ) : (
        <p>Please log in</p>
      )}
    </>
  );

};

export default Dashboard;
