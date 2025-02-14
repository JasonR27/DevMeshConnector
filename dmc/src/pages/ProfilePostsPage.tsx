// import { fetchProfilePosts } from '../services/api';
// import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import Posts from '../components/Posts';
import { Spinner, Alert } from 'react-bootstrap';
import { getCurrentProfilePostsQuery } from '../services/queries';

function ProfilePostsPage() {
  const [posts, setPosts] = useState<IPost[]>();
  const { data: postsData, error, isError, isPending } = getCurrentProfilePostsQuery();

  useEffect(() => {
      if (postsData) {
        setPosts(postsData);
      }
    }, [postsData]);

  if (isPending) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }
  if (isError) { 
    return <Alert variant="danger">Error! {(error as Error).message}</Alert>;
  }

  return (
    <>
      {isPending && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      {!error && postsData && <Posts posts={postsData} />}
    </>
  );
}

export default ProfilePostsPage;
