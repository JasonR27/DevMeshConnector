import React, { useEffect, useState } from "react";
import Posts from '../components/Posts';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import { getCurrentProfilePostsQuery } from '../services/queries';
import Box from '@mui/material/Box';

function ProfilePostsPage() {
  const [posts, setPosts] = useState<IPost[]>();
  const { data: postsData, error, isError, isPending } = getCurrentProfilePostsQuery();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {(error as Error).message}
      </Alert>
    );
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {isPending && <p>Loading posts...</p>}
      {error && <p>{error.message}</p>}
      {!error && postsData && <Posts posts={postsData} width="300vw" />}
    </Box>
    // <>
    //   {isPending && <p>Loading posts...</p>}
    //   {error && <p>{error}</p>}
    //   {!error && postsData && <Posts posts={postsData} />}
    // </>
  );
}

export default ProfilePostsPage;


// import React, { useEffect, useState } from "react";
// import Posts from '../components/Posts';
// import { Spinner, Alert } from 'react-bootstrap';
// import { getCurrentProfilePostsQuery } from '../services/queries';

// function ProfilePostsPage() {
//   const [posts, setPosts] = useState<IPost[]>();
//   const { data: postsData, error, isError, isPending } = getCurrentProfilePostsQuery();

//   useEffect(() => {
//       if (postsData) {
//         setPosts(postsData);
//       }
//     }, [postsData]);

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

// export default ProfilePostsPage;
