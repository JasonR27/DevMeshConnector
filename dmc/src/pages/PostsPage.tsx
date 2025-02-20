// import { fetchPosts } from '../services/api';
// import { useQuery } from '@tanstack/react-query';
// import Posts from '../components/Posts';
// import { Spinner, Alert } from 'react-bootstrap';
// import { getAllPostsQuery } from '../services/queries';

// function PostsPage() {
//   const { data: postsData, error, isError, isPending } = getAllPostsQuery();

//   if (isPending) {
//     return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
//   }
//   if (isError) {
//     return <Alert variant="danger">Error! {(error as Error).message}</Alert>;
//   }

//   return (
//     <>
//       {isPending && <p>Loading posts...</p>}
//       {error && <p>{error}</p>}
//       {!error && postsData && <Posts posts={postsData} />}
//     </>
//   );
// }

// export default PostsPage;

import { fetchPosts } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import Posts from '../components/Posts';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { getAllPostsQuery } from '../services/queries';
import Box from '@mui/material/Box';

const PostsPage = () => {
  const { data: postsData, error, isError, isPending } = getAllPostsQuery();

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <Alert severity="error">Error! {(error as Error).message}</Alert>;
  }

  return (
    // <>
    //   {isPending && <p>Loading posts...</p>}
    //   {error && <p>{error}</p>}
    //   {!error && postsData && <Posts posts={postsData} />}
    // </>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {isPending && <p>Loading posts...</p>}
      {error && <p>{error.message}</p>}
      {!error && postsData && <Posts posts={postsData} />}
    </Box>
  );
}

export default PostsPage;

