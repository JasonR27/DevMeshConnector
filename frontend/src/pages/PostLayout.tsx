import { Outlet } from 'react-router-dom';
import PostActions from '../components/PostActions';

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
