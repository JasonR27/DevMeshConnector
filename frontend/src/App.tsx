import 'bootstrap/dist/css/bootstrap.min.css'
import { CustomProvider } from 'rsuite';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Invoices from './components/Profile';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RootLayout from './components/RootLayout';
import ProfilesLayout from './components/ProfilesLayout';
import { supabaseClient } from './config/supabase-client';
import NewPostPage from './pages/NewPostPage';
import PostDetailPage from './pages/PostDetailPage';
import PostLayout from './pages/PostLayout';
import PostPage from './pages/PostPage';
import CorsErrorsPage from './pages/CorsErrorsPage';
// import ProfileLayout from './pages/ProfileLayout';
// import ProfilePage from './pages/ProfilePage';
import WelcomePage from './pages/WelcomePage';
import ProfilesPage from './pages/ProfilesPage';
import Signin from './components/Auth/Signin';
import Profile from './components/Profile';
// import { AuthProvider } from './components/Auth/Auth';

export const App = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>();
  // const toast = useToast();
  const [event, setEvent] = useState<AuthChangeEvent>()

  // supabaseClient.auth.onAuthStateChange((event) => {
  //   if (event === 'SIGNED_OUT') {
  //     setSignedIn(false);
  //     setEvent(event)
  //   }
  //   if (event === 'SIGNED_IN') {
  //     setSignedIn(true);
  //     setEvent(event)
  //   }
  // });

  // Show message buble when singnin or sign out

  // const showToast = useCallback((e: any) => {
  //   console.log('e', e);
  //   toast({
  //     position: 'bottom',
  //     render: () => (
  //       <Box color='white' p={3} bg='green.500'>
  //         {e === 'SIGNED_IN' ? `Signed In` : `Signed Out`}
  //       </Box>
  //     ),
  //   })
  // }, [toast]);

  useEffect(() => {
    // if (event) showToast(event)

    const setData = async () => {
      console.log('event useEffect hook showToast: ', event)
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      console.log('WTF reentry');
      if (session) {
        console.log("if signedin equal true")
        setSession(session)
        console.log('session from App', session.access_token)
        setSignedIn(true)

      } else {
        console.log("if signedin equal false")
        setSignedIn(false)
      }
    };
    setData()
  }, [event])

  return (
    // <ChakraProvider theme={theme}>
    //not really doing anything
    <CustomProvider theme="high-contrast" style={{ zIndex: 11 }}>
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
                <Route path="/profiles" element={<ProfilesLayout />}>
                  <Route index element={<ProfilesPage />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path="/posts" element={<PostLayout />}>
                  <Route index element={<PostPage />} />
                </Route>
                <Route path="/posts/:id" element={<PostDetailPage session={session} />} />
                <Route
                  path="/post/new"
                  element={
                    <ProtectedRoute>
                      <NewPostPage />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                <Route path="/corserrors" element={<CorsErrorsPage />} />
                <Route path="/myprofiles" element={
                  <ProtectedRoute style={{ zIndex: 12 }}>
                    <ProfilesLayout style={{ zIndex: 11 }} />
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
                <Route path="/login" element={<Signin />} />
              </Routes>
            </RootLayout>
          {/* </AuthProvider> */}
        </BrowserRouter>
      </div>
      {/* // </ChakraProvider> */}
    </CustomProvider>
  );
};
