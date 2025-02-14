import React, { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RootLayout from './components/RootLayout';
import ProfilesLayout from './components/ProfilesLayout';
import UsersLayout from './components/UsersLayout';
import NewPostPage from './pages/NewPostPage';
import PostDetailPage from './pages/PostDetailPage';
import PostLayout from './components/PostLayout';
import PostPage from './pages/PostPage';
import WelcomePage from './pages/WelcomePage';
import ProfilesPage from './pages/ProfilesPage';
import UsersPage from './pages/UsersPage';
import MyProfilesPage from './pages/MyProfilesPage';
import MainProfilePage from './pages/MainProfilePage';
import CurrentProfilePage from './pages/CurrentProfilePage';
import Signin from './components/Auth/Signin';
import Profile from './components/Profile';
import ProfilePostsPage from './pages/ProfilePostsPage';
import ProfilePageOwnerView from './pages/ProfilePageOwnerView';

export const App = () => {

  return (
    <StrictMode>
      <div data-bs-theme="dark" style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        // backgroundImage: 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmhic3B6MGwxaDlud2Rsa3NkNmhmNHo2b2xsc2NmMm1vNHl3ZXBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jMbfmwkrcm82PRlYa9/giphy.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }} >
        <BrowserRouter>
          {/* <AuthProvider> */}
          <RootLayout>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/users" element={<UsersLayout />}>
                <Route index element={<UsersPage />} />
              </Route>
              <Route path="/profiles" element={<ProfilesLayout />}>
                <Route index element={<ProfilesPage />} />
              </Route>
              <Route path="/user/page" element={
                <ProtectedRoute>
                  <UsersLayout />
                </ProtectedRoute>
              }>
                <Route index element={<ProfilePageOwnerView />} />
              </Route>
              <Route path='*' element={<NotFound />} />
              <Route path="/posts" element={<PostLayout />}>
                <Route index element={<PostPage />} />
              </Route>
              <Route path="/profiles/currentprofile/myposts" element={<PostLayout />}>
                <Route index element={<ProfilePostsPage />} />
              </Route>
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route
                path="/post/new"
                element={
                  <ProtectedRoute>
                    <NewPostPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/myprofiles" element={
                <ProtectedRoute>
                  <ProfilesLayout style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    zIndex: 13,
                  }} />
                </ProtectedRoute>
              }>
                <Route index element={<Profile />} />
              </Route>
              <Route path="/profiles/new" element={
                <ProtectedRoute >
                  <ProfilesLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Profile />} />
              </Route>
              <Route path="/profiles/myprofiles" element={
                <ProtectedRoute >
                  <ProfilesLayout />
                </ProtectedRoute>
              }>
                <Route index element={<MyProfilesPage />} />
              </Route>
              <Route path="/profiles/mainprofile" element={
                <ProtectedRoute >
                  <ProfilesLayout />
                </ProtectedRoute>
              }>
                <Route index element={<MainProfilePage />} />
              </Route>
              <Route path="/profiles/currentprofile" element={
                <ProtectedRoute >
                  <ProfilesLayout />
                </ProtectedRoute>
              }>
                <Route index element={<CurrentProfilePage />} />
              </Route>
              <Route path="/login" element={<Signin />} />
            </Routes>
          </RootLayout>
          {/* </AuthProvider> */}
        </BrowserRouter>
      </div>
    </StrictMode>
  );
};
