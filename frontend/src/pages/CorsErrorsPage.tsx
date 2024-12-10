import { fetchCorsErrors } from '../api';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { fetchCorsErrorsLogin } from '../api';


// import Posts from '../components/Posts';
import { Spinner, Alert } from 'react-bootstrap';

function CorsErrorsPage() {
  // const { data, error, isError, isLoading } = useQuery('corsErrors', fetchCorsErrors);
  // console.log(data);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log('entered post cors errors log in try');
      // setLoading(true);

      const response = await fetchCorsErrorsLogin();

      // const { redirectUrl, user } = response.data;
      const { user } = response.data;

      // localStorage.setItem('token', token);
      console.log('user: ', user)
      console.log('user.email: ', user.email)
      // setUser(user);
      console.log('localStorage.token: ', localStorage.token)

      // if (response.status === 200) {
      //   // localStorage.setItem('token', token);
      //   // console.log('localStorage.token: ', localStorage.token)
      //   setToastMessage({
      //     title: 'Logged In',
      //     message: 'Successfully Logged In',
      //     variant: 'success',
      //   });
      //   setShowToast(true);
      //   window.location.href = redirectUrl;
      // }
    } catch (err: any) {
      console.error('Login error:', err);
      // setToastMessage({
      //   title: 'Error',
      //   message: err.response?.data?.error || 'An error occurred during login',
      //   variant: 'danger',
      // });
      // setShowToast(true);
    } finally {
      // setLoading(false);
      // setEmail('');
      // setPassword('');
    }
  };

  const isLoading = false;
  const isError = false;

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full height of the viewport
          // backgroundColor: 'black', // Optional: Set a background color
        }}
      >
        <Spinner
          className="text-white m-5"
          animation="border"
          role="status"
          style={{
            width: '25%',
            height: '25vh',
          }}
        >
          <span className="visually-hidden">Loading...</span>
          {/* <div className="text-white text-center">Loading...</div> */}
        </Spinner>
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">Error! {(error as Error).message}</Alert>;
  }

  return (
    <>
      {/* {isLoading && <p>Loading posts...</p>}
      {error && <p>{error}</p>} */}
      {/* {!error && data && <Posts posts={data} />} */}
      {/* {!error && data && <div className="text-white">div with fetched data: {data.user.email}</div> }
      {!error && data && <div className="text-white">div with session token: {data.user.role}</div> } */}
      
      {/* <div className="text-white"> Test div </div>
      <div className="container-fluid text-white text-center" style={{

        width: '100%',
        height: '100vh',
        // backgroundImage: 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmhic3B6MGwxaDlud2Rsa3NkNmhmNHo2b2xsc2NmMm1vNHl3ZXBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jMbfmwkrcm82PRlYa9/giphy.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}>Width 100%</div> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full height of the viewport
          // backgroundColor: 'black', // Optional: Set a background color
        }}
      >
        <button onClick={handleLogin}>Cr httpOnly Cookie</button>
      </div>

    </>
  );
}

export default CorsErrorsPage;
