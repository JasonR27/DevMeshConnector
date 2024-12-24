import React from 'react';
import { Outlet } from 'react-router-dom';
import UserActions from './UserActions';

const UsersLayout = () => {
  return (
    <>
      <UserActions />  
      <Outlet />
    </>
  );
};

export default UsersLayout;

// another version

// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import UserActions from './UserActions';

// const UsersLayout = () => {
//   return (
//     <div style={{ height: '100vh', overflow: 'auto' }}>
//       <UserActions />  
//       <Outlet />
//     </div>
//   );
// };

// export default UsersLayout;
