import { fetchProfilePosts } from '../api';
import { useQuery } from 'react-query';
import Posts from '../components/Posts';
import { Spinner, Alert } from 'react-bootstrap';

function ProfilePostsPage() {
  const { data, error, isError, isLoading } = useQuery('posts', fetchProfilePosts);

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }
  if (isError) {
    return <Alert variant="danger">Error! {(error as Error).message}</Alert>;
  }

  return (
    <>
      {isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && data && <Posts posts={data} />}
    </>
  );
}

export default ProfilePostsPage;
