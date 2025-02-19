import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/Auth';
import { verifySession, postLogOut } from '../services/api';
import { useThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { styled } from '@mui/system'; 

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : 'white',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

const MenuStyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const MainNavigation = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isUserLoggedIn = async () => {
    try {
      const isValid = await verifySession();
      if (isValid) {
        setIsLoggedIn(true);
        return true;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };

  isUserLoggedIn();

  const signOut = async () => {
    await postLogOut();
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleClickSignIn = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{
        position: 'relative',
        zIndex: 13,
      }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DevMesh 🚀
        </Typography>

        {!isMobile && (
          <>
            <StyledLink to="/">
              <Button color="inherit">Home</Button>
            </StyledLink>
            <StyledLink to="/profiles">
              <Button color="inherit">Profiles</Button>
            </StyledLink>
            <StyledLink to="/posts">
              <Button color="inherit">Posts</Button>
            </StyledLink>
            <StyledLink to="/myprofiles">
              <Button color="inherit">My Profiles</Button>
            </StyledLink>
            <StyledLink to="/profiles/currentprofile/myposts">
              <Button color="inherit">Profile Posts</Button>
            </StyledLink>
            <StyledLink to="/events">
              <Button color="inherit">Events</Button>
            </StyledLink>
          </>
        )}
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {isMobile && [
              <MenuStyledLink to="/">
                <MenuItem onClick={handleMenuClose}>Home</MenuItem>
              </MenuStyledLink>,
              <MenuStyledLink to="/profiles">
                <MenuItem onClick={handleMenuClose}>Profiles</MenuItem>
              </MenuStyledLink>,
              <MenuStyledLink to="/posts">
                <MenuItem onClick={handleMenuClose}>Posts</MenuItem>
              </MenuStyledLink>,
              <MenuStyledLink to="/myprofiles">
                <MenuItem onClick={handleMenuClose}>My Profiles</MenuItem>
              </MenuStyledLink>,
              <MenuStyledLink to="/profiles/currentprofile/myposts">
                <MenuItem onClick={handleMenuClose}>Profile Posts</MenuItem>
              </MenuStyledLink>,
              <MenuStyledLink to="/events">
                <MenuItem onClick={handleMenuClose}>Events</MenuItem>
              </MenuStyledLink>]
          }
          <MenuStyledLink to="/user/page">
            <MenuItem onClick={handleMenuClose}>User Page</MenuItem>
          </MenuStyledLink>
          <MenuItem onClick={handleMenuClose} href="https://www.linkedin.com">Jobs</MenuItem>
          <MenuItem onClick={handleMenuClose} href="https://stackup.dev/">Hackathons</MenuItem>
          <MenuItem onClick={handleMenuClose} href="https://www.geeksforgeeks.org/">Events</MenuItem>
          {isLoggedIn ? (
            <Button color="secondary" onClick={signOut}>Sign Out</Button>
          ) : (
            <Button color="primary" onClick={handleClickSignIn}>Sign In</Button>
          )}
          <MenuItem onClick={handleMenuClose} href="https://youtu.be/dQw4w9WgXcQ?t=43">Contact JasonR27</MenuItem>
        </Menu>
        {isLoggedIn && (
          <Typography variant="subtitle1" component="div" sx={{ marginLeft: 2 }}>
            Welcome, {user?.name}
          </Typography>
        )}
        <Button color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <LightModeIcon /> : <NightlightIcon />}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;


// import React, { useState, useContext } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import { AuthContext, useAuth } from './Auth/Auth';
// import { verifySession, postLogOut } from '../services/api';
// import { useThemeContext } from './Theming/ThemeContext';
// import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import NightlightIcon from '@mui/icons-material/Nightlight';
// import { styled } from '@mui/system';

// const StyledLink = styled(RouterLink)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : 'white',
//   '&:hover': {
//     color: theme.palette.primary.light,
//   },
// }));

// const MenuStyledLink = styled(RouterLink)(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.text.primary,
//   '&:hover': {
//     color: theme.palette.primary.main,
//   },
// }));

// const MainNavigation = () => {
//   const { darkMode, toggleDarkMode } = useThemeContext();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const isUserLoggedIn = async () => {
//     try {
//       const isValid = await verifySession();
//       if (isValid) {
//         setIsLoggedIn(true);
//         return true;
//       } else {
//         setIsLoggedIn(false);
//         return false;
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       return false;
//     }
//   };

//   isUserLoggedIn();

//   const signOut = async () => {
//     await postLogOut();
//     localStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleClickSignIn = () => {
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           DevMesh 🚀
//         </Typography>

//         {!isMobile && (
//           <>
//             <StyledLink to="/">
//               <Button color="inherit">Home</Button>
//             </StyledLink>
//             <StyledLink to="/profiles">
//               <Button color="inherit">Profiles</Button>
//             </StyledLink>
//             <StyledLink to="/posts">
//               <Button color="inherit">Posts</Button>
//             </StyledLink>
//             <StyledLink to="/myprofiles">
//               <Button color="inherit">My Profiles</Button>
//             </StyledLink>
//             <StyledLink to="/profiles/currentprofile/myposts">
//               <Button color="inherit">Profile Posts</Button>
//             </StyledLink>
//             <StyledLink to="/events">
//               <Button color="inherit">Events</Button>
//             </StyledLink>
//           </>
//         )}
//         <IconButton color="inherit" onClick={handleMenuClick}>
//           <MenuIcon />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl))}
//           onClose={handleMenuClose}
//         >
//           {isMobile && [
//             <MenuStyledLink key="home" to="/">
//               <MenuItem onClick={handleMenuClose}>Home</MenuItem>
//             </MenuStyledLink>,
//             <MenuStyledLink key="profiles" to="/profiles">
//               <MenuItem onClick={handleMenuClose}>Profiles</MenuItem>
//             </MenuStyledLink>,
//             <MenuStyledLink key="posts" to="/posts">
//               <MenuItem onClick={handleMenuClose}>Posts</MenuItem>
//             </MenuStyledLink>,
//             <MenuStyledLink key="myprofiles" to="/myprofiles">
//               <MenuItem onClick={handleMenuClose}>My Profiles</MenuItem>
//             </MenuStyledLink>,
//             <MenuStyledLink key="profilePosts" to="/profiles/currentprofile/myposts">
//               <MenuItem onClick={handleMenuClose}>Profile Posts</MenuItem>
//             </MenuStyledLink>,
//             <MenuStyledLink key="events" to="/events">
//               <MenuItem onClick={handleMenuClose}>Events</MenuItem>
//             </MenuStyledLink>
//           ]}
//           <MenuStyledLink to="/user/page">
//             <MenuItem onClick={handleMenuClose}>User Page</MenuItem>
//           </MenuStyledLink>
//           <MenuItem onClick={handleMenuClose} href="https://www.linkedin.com">Jobs</MenuItem>
//           <MenuItem onClick={handleMenuClose} href="https://stackup.dev/">Hackathons</MenuItem>
//           <MenuItem onClick={handleMenuClose} href="https://www.geeksforgeeks.org/">Events</MenuItem>
//           {isLoggedIn ? (
//             <Button color="secondary" onClick={signOut}>Sign Out</Button>
//           ) : (
//             <Button color="primary" onClick={handleClickSignIn}>Sign In</Button>
//           )}
//           <MenuItem onClick={handleMenuClose} href="https://youtu.be/dQw4w9WgXcQ?t=43">Contact JasonR27</MenuItem>
//         </Menu>
//         {isLoggedIn && (
//           <Typography variant="subtitle1" component="div" sx={{ marginLeft: 2 }}>
//             Welcome, {user?.name}
//           </Typography>
//         )}
//         <Button color="inherit" onClick={toggleDarkMode}>
//           {darkMode ? <LightModeIcon /> : <NightlightIcon />}
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default MainNavigation;
