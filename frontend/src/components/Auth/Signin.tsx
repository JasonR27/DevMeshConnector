/* eslint-disable react/react-in-jsx-scope */
import { Container, Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'react-bootstrap'
import classnames from 'classnames';
import { Session } from '@supabase/supabase-js';
import { SetStateAction, useEffect, useState } from 'react';
// import { HiEye, HiEyeOff } from 'react-icons/hi';
import { redirect } from 'react-router-dom';
// import { supabaseClient } from '../../config/supabase-client';
// import { regex } from '../../utils/constants';
// import Logo from './Logo';
// import { OAuthButtonGroup } from './OAuthButtonGroup';
import CustomToast from '../CustomToast';
import { createUser, logInUser } from '../../api';
import { useMutation } from 'react-query';
// import { error } from 'console'; // thows polifyls error
import { AxiosResponse } from 'axios';
// import 'console-polyfill';
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom';


export const Signin = () => {

  // const navigate = useNavigate();

  const { user, setUser, login } = useAuth();
  const navigate = useNavigate();

  // const formBackground = useColorModeValue('gray.100', 'gray.700');
  // Hook for signup state management
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  // const [user, setUser] = useState<IUser>()

  const [showToast, setShowToast] = useState(false);

  const [authButtonState, setAuthButtonState] = useState(true);
  // const [isCreatingUser, setIsCreatingUser] = useState(true);

  const [magicEmail, setMagicEmail] = useState('');
  // const [email, setEmail] = useState('');

  // const [loadingGithub, setLoadingGithub] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [magicEmailDisabled, setMagicEmailDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(false);

  const [session, setSession] = useState<Session | null>();


  // New hooks for bootstrap

  // const [authButtonState, setAuthButtonState] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

  // interface ToastMessage {
  //   title: string;
  //   message: string;
  //   variant: ToastVariant;
  // }

  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const postLogInUser = async (): Promise<AxiosResponse> => {
    // const profile: Omit<IProfile, 'id'
    const user: Omit<IPossibleUser, 'id'> = {
      email: email,
      password: password,
    };
    // const userfetch = await logInUser(user);
    // setUser(userfetch.user);
    // setUser(await logInUser(user))
    // return await logInUser(user);
    if (login != null) {
      console.log('login != from null');
      return await login(user);
    } else {
      console.log('login equal null error on postLogInUser')
      return {data: '', status: 0, statusText: '', headers: {'': ''}, config: {}};
    }   
  }

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log('entered log in try');
      setLoading(true);

      const response = await postLogInUser();

      const { redirectUrl, user } = response.data;

      // localStorage.setItem('token', token);
      console.log('user: ', user)
      console.log('user.email: ', user.email)
      // setUser(user);
      console.log('localStorage.token: ', localStorage.token)

      if (response.status === 200) {
        // localStorage.setItem('token', token);
        // console.log('localStorage.token: ', localStorage.token)
        setToastMessage({
          title: 'Logged In',
          message: 'Successfully Logged In',
          variant: 'success',
        });
        setShowToast(true);
        window.location.href = redirectUrl;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setToastMessage({
        title: 'Error',
        message: err.response?.data?.error || 'An error occurred during login',
        variant: 'danger',
      });
      setShowToast(true);
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleRegister = async () => {
    try {

      setLoading(true);

      postUser()

      if (Error) {
        // toast
        console.log('error: ', Error, Error.name)
      } else {
        // toast
        // postUser()
        console.log('Registered Succesfully')
        // navigate("/myprofiles");
        // window.location.href = '/myprofiles';
        redirect('/myprofiles')
      }
    }
    // catch (err) {
    //   // console.log(err)
    //   throw err;
    // }
    finally {
      // setEmail('')
      // setPassword('')
      setLoading(false);
    }
  }

  const postCreateUser = async (): Promise<AxiosResponse> => {
    // const profile: Omit<IProfile, 'id'
    const user: Omit<IUser, 'id'> = {
      username: username,
      email: email,
      password: password,
      name: name,
    };

    // return await createUser(user);

    try {
        const response: AxiosResponse = await createUser(user);
        const { redirectUrl } = response.data;
    
        if (redirectUrl) {
          // Use react-router-dom's useNavigate to redirect
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error creating profile:', error);
        // Handle error
      }
  }

  const { isLoading: isCreatingUser, mutate: postUser } = useMutation(postCreateUser, {
    onSuccess(res) {
      console.log('Profile Created Succesfully!');
      redirect('/profiles/myprofiles')
      // toast({
      //   title: 'Profile created.',
      //   position: 'top',
      //   variant: 'subtle',
      //   description: '',
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true
      // });
      if (isCreatingUser) {
        console.log('loading')
      }
      console.log('res', res);
      // <CustomToast show={true} onClose={function (): void {
      //   throw new Error('Function not implemented.');
      // }} title={''} message={'User created succesfully'} variant={'warning'} />
      // refetchUser()
    }
  });

  useEffect(() => {
    if (session) {
      console.log(session)
    }
  }, [])



  const toggle = (tab: SetStateAction<string>) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value);
  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value);
  const handleUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value);
  const handleMagicEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => setMagicEmail(e.target.value);

  // const handleRegister = () => {
  //   setLoading(true);
  //   // Registration logic here
  // };

  // const handleLogin = () => {
  //   setLoading(true);
  //   // Login logic here
  // };

  // const handleLoginWithMagic = email => {
  //   setLoading(true);
  //   // Magic link login logic here
  // };

  return (
    <Container className="py-5">
      <Row className="justify-content-center"

      >
        <Col lg="6" className='border border-primary' style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          position: 'relative',
        }}>
          <div className="text-center mb-4">
            <h1>{!authButtonState ? 'Register a new account' : 'Sign in to your account'}</h1>
            <p>
              {authButtonState ? "Don't have an account?" : 'Already a User?'}{' '}
              <Button color="link" onClick={() => setAuthButtonState(!authButtonState)}>
                {authButtonState ? 'Sign up' : 'Log in'}
              </Button>
            </p>
          </div>
          <div className="bg-light p-4 rounded shadow-sm">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
                >
                  Username/Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Magic Link
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Form>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" value={email} onChange={handleEmailChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
                  </FormGroup>
                  {!authButtonState ? <><FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" value={name} onChange={handleNameChange} />
                  </FormGroup><FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </FormGroup></> : <></>}

                  <Button color="link" onClick={!authButtonState ? handleRegister : handleLogin} disabled={emailDisabled || !password}>
                    {loading ? 'Loading...' : (!authButtonState ? 'Register' : 'Sign in')}
                  </Button>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup>
                    <Label for="magicEmail">Email address</Label>
                    <Input type="email" id="magicEmail" value={magicEmail} onChange={handleMagicEmailChange} />
                  </FormGroup>
                  {/* <Button color="primary" onClick={() => handleLoginWithMagic(magicEmail)} disabled={magicEmailDisabled}>
                    {loading ? 'Sending magic link ...' : 'Send magic link'}
                  </Button> */}
                </Form>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
      {toastMessage ? (
        <CustomToast
          show={showToast}
          onClose={() => setShowToast(false)}
          title={toastMessage.title}
          message={toastMessage.message}
          variant={toastMessage.variant}
        />) : <></>
      }
    </Container>
  );
};

export default Signin;
