import React from 'react';
import { AxiosResponse } from 'axios';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { redirect, useNavigate } from 'react-router-dom';
// import eventBus from '../eventBus';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext, useAuth } from './Auth/Auth'
import { verifySession } from '../services/api';
import { postLogOut } from '../services/api';



const MainNavigation = () => {
  const [avatar_url, setAvatarUrl] = useState<any>();
  const [profile, setProfile] = useState<IProfile>()
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  console.log('useAuth(): ', useAuth())

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
      console.error('Error verifying token:', error);
      return false;
    }
  };

  isUserLoggedIn();

  const signOut = async () => {
    // Clear the JWT token from local storage
    postLogOut();    

    // Optionally, clear all local storage data
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
  };

  if (user) {
    console.log('user.id', user.id)
  }

  return (
    <>
    <div className="navContainer">
      <nav className="navbar navbar-expand-lg fullNav">
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
                <a className="nav-link active" href="/profiles">Profiles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/posts">Posts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/myprofiles">My Profiles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/profiles/currentprofile/myposts">Profile Posts</a>
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
                <li><a className="dropdown-item" href="/user/page">User Page</a></li>
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
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="https://youtu.be/dQw4w9WgXcQ?t=43">Contact JasonR27</a></li>
                </ul>
              </li>
          <li className="nav-item">
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
      </div>
    </>
  );
};

export default MainNavigation;
