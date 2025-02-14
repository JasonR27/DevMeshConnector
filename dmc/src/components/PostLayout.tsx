import { Outlet } from 'react-router-dom';
import PostActions from './PostActions';

const PostLayout = () => {
  localStorage.clear();
  return (
    <>
      <PostActions />
      <Outlet />
    </>
  );
};

export default PostLayout;
