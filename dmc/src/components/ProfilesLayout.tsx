import { Outlet } from 'react-router-dom';
import ProfilesActions from './ProfilesActions';

const ProfilesLayout = () => {
  return (
    <>
      <ProfilesActions style={{
        position: 'relative',
        top: 0,
        left: 0,
        zIndex: 13,
      }}/>  
      <Outlet />
    </>
  );
};

export default ProfilesLayout;