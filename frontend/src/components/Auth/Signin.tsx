/* eslint-disable react/react-in-jsx-scope */
import { Container, Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'react-bootstrap'
import classnames from 'classnames';
import { Session, User } from '@supabase/supabase-js';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
// import { HiEye, HiEyeOff } from 'react-icons/hi';
import { redirect } from 'react-router-dom';
import { supabaseClient } from '../../config/supabase-client';
import { regex } from '../../utils/constants';
import Logo from './Logo';
// import { OAuthButtonGroup } from './OAuthButtonGroup';
import CustomToast from '../CustomToast';
import { createUser, logInUser } from '../../api';
import { useMutation } from 'react-query';
// import { error } from 'console'; // thows polifyls error
import { AxiosResponse } from 'axios';
import 'console-polyfill';


export const Signin = () => {

  // const navigate = useNavigate();

  const token = localStorage.getItem('token')

  if (!token) {
    // window.location.href = '/login';
    // navigate('/login');
    redirect('/myprofiles')
  }
  // const formBackground = useColorModeValue('gray.100', 'gray.700');
  // Hook for signup state management
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [showToast, setShowToast] = useState(true);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', variant: '' });
  const [authButtonState, setAuthButtonState] = useState(true);
  // const [isCreatingUser, setIsCreatingUser] = useState(true);
  

  const [magicEmail, setMagicEmail] = useState('');
  // const [email, setEmail] = useState('');

  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicEmailDisabled, setMagicEmailDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(false);
  
  const [session, setSession] = useState<Session | null>();
  

  // New hooks for bootstrap

  // const [authButtonState, setAuthButtonState] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  

  function signInWithSocial(socialName: string): void {
    switch (socialName) {
      case 'Google':
        consoleGoogle()
        break;
      case 'GitHub':
        signGithub()
        break;
      case 'Twitter':
        consoleTwitter()
        break;
      default:
        break;
    }
  }

  const signInWithGithub = async () => {
    try {
      setLoadingGithub(true)
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error
    } catch (error: unknown) {
      // toast({
      //   title: 'Error',
      //   position: 'top',
      //   description: error.error_description || error.message,
      //   status: 'error',
      //   duration: 5000,
      //   isClosable: true
      // });
      console.log(error)
    }
  };

  const checkMagicEmail = (e: any) => {
    setMagicEmailDisabled(!regex.test(e.target.value));
    setMagicEmail(e.target.value)
  }

  const checkEmail = (e: any) => {
    setEmailDisabled(!regex.test(e.target.value));
    setEmail(e.target.value)
  }

  // const handlePassword = (e: string) => {
  //   setPassword(e.target.value)
  // }

  // const handleUsername = (e: any) => {
  //   setUsername(e.target.value)
  // }

  // const handleName = (e: any) => {
  //   setName(e.target.value)
  // }

  const handleLoginWithMagic = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithOtp({ email });
      if (error) throw error;
      // toast({
      //   title: 'Account confirmed.',
      //   position: 'top',
      //   description: 'Check your email for the login link',
      //   status: 'success',
      //   duration: 5000,
      //   isClosable: true
      // });
    } catch (error: any) {
      // toast({
      //   title: 'Error',
      //   position: 'top',
      //   description: error.error_description || error.message,
      //   status: 'error',
      //   duration: 5000,
      //   isClosable: true
      // });
    } finally {
      setLoading(false);
      setEmail('')
    }
  };

  const consoleGoogle = () => {
    console.log('Login with google...')
  }

  const signGithub = () => {
    signInWithGithub();
  }

  const consoleTwitter = () => {
    console.log('Login with twitter...')
  }


  // commented bc of it says is not being use

  // const handleCallBack = useCallback(
  //   (stringFromChild: string) => {
  //     signInWithSocial(stringFromChild)
  //   },
  //   []
  // );


  // const handlePasswordCallBack = useCallback(
  //   (passwordFromChild: string) => {
  //     setPassword(passwordFromChild)
  //   },
  //   []
  // );


  const postLogInUser = async (): Promise<AxiosResponse> => {
    // const profile: Omit<IProfile, 'id'
    const user: Omit<IPossibleUser, 'id'> = {
      email: email,
      password: password,
    };
    return await logInUser(user);
  }

  const handleLogin = async () => {
    try {
      console.log('entered log in try');
      setLoading(true);

      // setPosiuser({email, password});
      postLogInUser();

      if (Error) {
        console.log('error unable to login', Error)
        setToastMessage({
          title: 'Error',
          message: 'An error occurred',
          variant: 'warning',
        });
        setShowToast(true);
        <CustomToast show={showToast} onClose={(): void => {setShowToast(false)} } title={'toast  login error title here'} message={'toast login error message here'} variant={'warning'} />
      } else {
        setToastMessage({
          title: 'Logged In',
          message: 'Successfully Logged In',
          variant: 'success',
        });
        setShowToast(true);
        <CustomToast show={showToast} onClose={(): void => {setShowToast(false)} } title={'toast  login error title here'} message={'toast login error message here'} variant={'warning'} />
        // <CustomToast show={false} onClose={function (): void {
        //   throw new Error('Function not implemented.');
        // } } title={''} message={''} variant={'warning'} />
        // setUser(data.user);
        // setSession(data.session);
        // console.log('data.session: ', data.session);
        console.log('signed in');
        // history.push('/myprofiles');
        // window.location.href = '/myprofiles';
        // navigate('/myprofiles');
        redirect('/myprofiles')
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log('entered log in finally');
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  // const fetchUser = async () => {
  //   const res: AxiosResponse<ApiDataType> = await getUserByEmail(user?.email!)
  //   return res.data;
  // };

  // const { data: profileData, error: profileError, isLoading: isFetchingProfile, refetch: refetchUser } = useQuery(['profile'], fetchUser, {
  //   enabled: false, retry: 2, cacheTime: 0, onSuccess(res: IUser) {
  //     setUser(res)
  //     if (res != null) {
  //       setUsername(res.username)
  //       setEmail(res.email)
  //       setUserId(res.id)
  //       if (res.programmingLanguages.length !== newParams.length) {
  //         res.programmingLanguages.forEach(obj => {
  //           newParams.push(obj)
  //         })
  //       }

  //     } else {
  //       setIsEditingLanguage(true)
  //     }
  //   },
  //   onError: (error: any) => {
  //     // toast({
  //     //   title: 'Error',
  //     //   position: 'top',
  //     //   variant: 'subtle',
  //     //   description: error,
  //     //   status: 'error',
  //     //   duration: 3000,
  //     //   isClosable: true
  //     // });
  //   }
  // });

  const handleRegister = async () => {
    try {

      setLoading(true);

      postUser()

      if (Error) {
        // toast
        console.log('error: ', Error, Error.name)
      } else {
        // toast
        postUser()
        console.log('Registered Succesfully')
        // navigate("/myprofiles");
        // window.location.href = '/myprofiles';
        redirect('/myprofiles')
      }
    } catch (err) {
      // console.log(err)
      throw err;
    } finally {
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
    return await createUser(user);
  }

  const { isLoading: isCreatingUser, mutate: postUser } = useMutation(postCreateUser, {
    onSuccess(res) {
      console.log('Profile Created Succesfully!');
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
      <CustomToast show={true} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } title={''} message={'User created succesfully'} variant={'warning'} />
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
                  <Button color="primary" onClick={() => handleLoginWithMagic(magicEmail)} disabled={magicEmailDisabled}>
                    {loading ? 'Sending magic link ...' : 'Send magic link'}
                  </Button>
                </Form>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
