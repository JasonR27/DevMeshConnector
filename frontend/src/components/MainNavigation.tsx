import { Session, User } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
// import { FaHome } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { redirect, useNavigate } from 'react-router-dom';
// import { getPictureByProfileId, getProfileByAuthorEmail } from '../api';
// import ColorModeSwitcher from '../ColorModeSwitcher';
import { supabaseClient } from '../config/supabase-client';
import eventBus from '../eventBus';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext, useAuth } from './Auth/Auth'
// import { useUser } from './Auth/Auth'
// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { getUserInfo, getUserData } from '../api';
import { verifySession } from '../api';
import { postLogOut } from '../api';



const MainNavigation = () => {
  // const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [avatar_url, setAvatarUrl] = useState<any>();
  // const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [profile, setProfile] = useState<IProfile>()
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  console.log('useAuth(): ', useAuth())

  console.log('user: ', user)

  console.log('user: ', user)

  console.log('user email: ', user?.email)

  const isUserLoggedIn = async () => {
    try {
      const isValid = await verifySession();  // await the async function
      console.log('isValid:', isValid);
      if (isValid) {  
        setIsLoggedIn(true);          
        console.log('User is logged in');
        if (isValid === true) {
          setIsLoggedIn(true);          
        }
        return true;
      } else {
        if (isValid === false) {
          setIsLoggedIn(false);          
        }
        console.log('No user token found');
        return false;
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      return false;
    }
  };

  isUserLoggedIn();

  // const fetchProfile = async () => {
  //   const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(session?.user?.email!)
  //   return res.data;
  // };

  // const { data: profileData, error, isLoading: isFetchingProfile, refetch: refetchProfile } = useQuery('profile', fetchProfile, {
  //   enabled: false, onSuccess(res: IProfile) {
  //     setProfile(res)
  //   },
  //   onError: (err) => {
  //     console.log(err)
  //   }
  // });

  // const fetchProfilePicture = async () => {
  //   const res: AxiosResponse<ApiDataType> = await getPictureByProfileId(profile?.id!)
  //   return res.data
  // }

  // const { data: pictureData, isLoading, isError, refetch: refetchPicture } = useQuery('profilePicture', fetchProfilePicture, {
  //   enabled: false, retry: 2, cacheTime: 0, onSuccess(res: IPicture) {
  //     //setPicture(res)
  //   },
  //   onError: (error: any) => {
  //     console.log(error)
  //   }
  // })

  useEffect(() => {

    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  async function downloadImage(path: any) {
    try {
      const { data, error }: any = await supabaseClient.storage.from('images').download(path);
      if (error) {
        throw error;
      }
      const url: any = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  // we listen for potential ProfilePage.tsx updates especially avatar
  // and we reload the gravatar url
  eventBus.on('profileUpdated', (hasUpdated: boolean) => {
    if (hasUpdated) {
      refetchProfile()
      refetchPicture()
    }
  });

  // useEffect(() => {
  //   if (session?.user) {
  //     //console.log('user->', session.user.email)
  //     setUser(session.user)
  //     refetchProfile()
  //   }

  //   if (user) {

  //     //setProfile(profileData)
  //     setAvatarUrl(profile?.picture?.avatarUrl)
  //   }
  // }, [session?.user, profile, user, refetchProfile])

  // function removeToken(user: IUser) {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     console.error('No token found');
  //     return;
  //   }

  //   const email = user?.email || ''; // Ensure email is a string

  //   if (!email) {
  //     console.error('No user email found');
  //     return;
  //   }

  //   fetch('http://localhost:8080/api/v1/auth/logout', { // backend URL
  //     method: 'POST', // or 'POST' if your endpoint expects a POST request
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': token, // Include the token in the Authorization header
  //       'email': email,
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.valid) {
  //         console.log('Token is valid');
  //         // setIsVerified(true)
  //         // Proceed with authenticated user actions
  //       } else {
  //         console.error('Invalid token');
  //         // setIsVerified(false)
  //         // Handle invalid token case
  //       }
  //     })
  //     .catch(error => console.error('Error:', error));
  // }

  // removeToken(user);

  const signOut = async () => {
    // await supabaseClient.auth.signOut()
    // Clear the JWT token from local storage
    // removeToken(user);
    postLogOut();    

    // Optionally, you can clear all local storage data
    localStorage.clear();

    // Redirect to the sign-in or home page
    window.location.href = '/login';
    setAvatarUrl('')
    // redirect('/login')
    // navigate("/login");
  }

  const handleClickSignIn = () => {
    navigate('/login');
    // redirect('/login')
    if (user) {
      console.log('user.id', user.id)
    }

    if (session) {
      console.log('session.access_token', session.access_token)
      console.log('session.user.id', session.user.id)
      console.log('session.user.created_at', session.user.created_at)
    }
  };

  if (user) {
    console.log('user.id', user.id)
  }

  if (session) {
    console.log('session.access_token', session.access_token)
    console.log('session.user.id', session.user.id)
    console.log('session.user.created_at', session.user.created_at)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">DevMesh 🚀</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="profiles">Profiles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="posts">Posts</a>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" to="/myprofiles">My Profiles</a> */}
                {/* <Link className="nav-link" to="/myprofiles">My Profiles</Link> */}
                <a className="nav-link active" href="myprofiles">My Profiles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="corserrors">CORS errors</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="https://www.geeksforgeeks.org/">Events</a>
              </li>
              <form className="d-flex ps-5" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>

              
            </ul>


          </div>
        </div>
        
        <ul className="navbar-nav">
        <li className="nav-item dropdown ps-5" >
                <a className="text-light mb-4 nav-link dropdown-toggle ps-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.linkedin.com">Jobs</a></li>
                  <li><a className="dropdown-item" href="https://stackup.dev/">Hackatons</a></li>
                  <li><a className="dropdown-item" href="https://www.geeksforgeeks.org/">Events</a></li>
                  <div>
                    {isLoggedIn ? (
                      <button className="btn btn-danger m-1 p-2 pl-5 pr-9" onClick={signOut}>Sign Out Button</button>
                    ) : (
                      <button className="btn btn-primary m-1 p-2 pl-5 pr-9" onClick={handleClickSignIn}>Sign In</button>

                    )}
                  </div>

                  {/* <li><a>Sign Out</a></li> */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="https://youtu.be/dQw4w9WgXcQ?t=43">Contact JasonR27</a></li>
                </ul>
              </li>
          <li className="nav-item">
            {/* <button className="btn btn-primary m-1 p-2 pl-5 pr-9">Sign In</button> */}
            
            <div>

              {
                isLoggedIn ? (
                  <div className='text-success'>Welcome, {user?.name}</div>
                ) : (
                  <button className="btn btn-primary m-1 p-2 pl-5 pr-9" onClick={handleClickSignIn}>Sign In</button>
                )}
            </div>
          </li>
        </ul>
        
      </nav>
    </>
  );
};

export default MainNavigation;
