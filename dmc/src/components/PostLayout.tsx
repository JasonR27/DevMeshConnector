import { Outlet } from 'react-router-dom';
import PostActions from './PostActions';

const PostLayout = () => {
  return (
    <>
      <PostActions sx={{
      position: 'relative'
    }}/>
      <Outlet />
    </>
  );
};

export default PostLayout;
