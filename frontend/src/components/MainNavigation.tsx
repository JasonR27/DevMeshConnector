import { Session, User } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
// import { FaHome } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { redirect, useNavigate } from 'react-router-dom';
import { getPictureByProfileId, getProfileByAuthorEmail } from '../api';
// import ColorModeSwitcher from '../ColorModeSwitcher';
import { supabaseClient } from '../config/supabase-client';
import eventBus from '../eventBus';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from './Auth/Auth'
// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';


const MainNavigation = () => {
  // const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [avatar_url, setAvatarUrl] = useState<any>();
  // const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [profile, setProfile] = useState<IProfile>()
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const { user } = Signin();
  const { user, setUser } = useAuth();

  // setUser(user)

  // useEffect(() => {
  //   // we listen here if someone cleans the storage in the browser
  //   // so we push him back and logout
  //   // check: https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  //   // const handleLocalStorage = () => {
  //   //   window.addEventListener('storage', (event) => {
  //   //     if (event) supabaseClient.auth.signOut()
  //   //   })
  //   // }
  //   //if (session) getAvatarUrl();
  //   //if (session) refetch()
  //   // handleLocalStorage()
  // }, []);

  // useEffect(() => {
  //   const setData = async () => {
  //     const { data: { session }, error } = await supabaseClient.auth.getSession();
  //     if (error) throw error;
  //     if (session) {
  //       setSession(session)
  //       setUser(session.user)
  //     }
  //   };

  //   useEffect(() => {
  //     const setData = async () => {
  //       const { data: { session }, error } = await supabaseClient.auth.getSession();
  //       if (error) throw error;
  //       if (session) {
  //         setSession(session)
  //         setUser(session.user)
  //       }
  //     };

  //   // async function signOut() {
  //   //   const { error } = await supabaseClient.auth.signOut()
  //   // }

  //   supabaseClient.auth.onAuthStateChange((_event, session) => {
  //     if (_event === 'SIGNED_OUT') {
  //       localStorage.removeItem('user');
  //     }
  //     setSession(session);
  //   });

  //   setData();
  // }, []);

  function isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('User is logged in');
      return true;
    } else {
      console.log('No user token found');
      return false;
    }
  }

  const fetchProfile = async () => {
    const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(session?.user?.email!)
    return res.data;
  };

  const { data: profileData, error, isLoading: isFetchingProfile, refetch: refetchProfile } = useQuery('profile', fetchProfile, {
    enabled: false, onSuccess(res: IProfile) {
      setProfile(res)
    },
    onError: (err) => {
      console.log(err)
    }
  });

  const fetchProfilePicture = async () => {
    const res: AxiosResponse<ApiDataType> = await getPictureByProfileId(profile?.id!)
    return res.data
  }

  const { data: pictureData, isLoading, isError, refetch: refetchPicture } = useQuery('profilePicture', fetchProfilePicture, {
    enabled: false, retry: 2, cacheTime: 0, onSuccess(res: IPicture) {
      //setPicture(res)
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

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

  function removeToken(user: IUser) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    const email = user?.email || ''; // Ensure email is a string

    if (!email) {
      console.error('No user email found');
      return;
    }

    fetch('http://localhost:8080/api/v1/auth/logout', { // backend URL
      method: 'POST', // or 'POST' if your endpoint expects a POST request
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Include the token in the Authorization header
        'email': email,
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          console.log('Token is valid');
          // setIsVerified(true)
          // Proceed with authenticated user actions
        } else {
          console.error('Invalid token');
          // setIsVerified(false)
          // Handle invalid token case
        }
      })
      .catch(error => console.error('Error:', error));
  }

  // removeToken(user);

  const signOut = async () => {
    // await supabaseClient.auth.signOut()
    // Clear the JWT token from local storage
    removeToken(user);
    localStorage.removeItem('token');

    // Optionally, you can clear all local storage data
    // localStorage.clear();

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
                <a className="nav-link active" href="https://www.geeksforgeeks.org/">Events</a>
              </li>
              <form className="d-flex ps-5" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>

              <li className="nav-item dropdown ps-5" >
                <a className="nav-link dropdown-toggle ps-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.linkedin.com">Jobs</a></li>
                  <li><a className="dropdown-item" href="https://stackup.dev/">Hackatons</a></li>
                  <li><a className="dropdown-item" href="https://www.geeksforgeeks.org/">Events</a></li>
                  <div>
                    {isUserLoggedIn() ? (
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
            </ul>


          </div>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            {/* <button className="btn btn-primary m-1 p-2 pl-5 pr-9">Sign In</button> */}
            <div>

              {
                isUserLoggedIn() ? (
                  <div className='text-success'>Welcome, {user?.email}</div>
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
