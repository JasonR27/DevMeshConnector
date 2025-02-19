import { Outlet } from 'react-router-dom';
import ProfilesActions from './ProfilesActions';

const ProfilesLayout = () => {
  return (
    <>
      <ProfilesActions sx={{
        py: 5,
        position: 'relative'
      }} />
      <Outlet />
    </>
  );
};

export default ProfilesLayout;