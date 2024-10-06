import { Container, Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'react-bootstrap'
import classnames from 'classnames';
import { Session, User } from '@supabase/supabase-js';
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { supabaseClient } from '../../config/supabase-client';
import { regex } from '../../utils/constants';
import Logo from './Logo';
import { OAuthButtonGroup } from './OAuthButtonGroup';
import CustomToast from '../CustomToast';


export const Signin = () => {
  // const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [showToast, setShowToast] = useState(false);
  const [authButtonState, setAuthButtonState] = useState(true);
  // const toast = useToast();
  const navigate = useNavigate();
  const [magicEmail, setMagicEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicEmailDisabled, setMagicEmailDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [Rmsg, setRMsg] = useState(''); // Registration message
  const [Lmsg, setLMsg] = useState(''); // Login message
  const [user, setUser] = useState<User | null>(); // User object after registration / login
  const [session, setSession] = useState<Session | null>();

  // New hooks for bootstrap

  // const [authButtonState, setAuthButtonState] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [magicEmail, setMagicEmail] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [emailDisabled, setEmailDisabled] = useState(true);
  // const [magicEmailDisabled, setMagicEmailDisabled] = useState(false);

  // const { isOpen, onToggle } = useDisclosure()

  // const onClickReveal = () => {
  //   onToggle()
  // }

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
    } catch (error: any) {
      // toast({
      //   title: 'Error',
      //   position: 'top',
      //   description: error.error_description || error.message,
      //   status: 'error',
      //   duration: 5000,
      //   isClosable: true
      // });
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

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

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

  const handleCallBack = useCallback(
    (stringFromChild: string) => {
      signInWithSocial(stringFromChild)
    },
    []
  );

  const handlePasswordCallBack = useCallback(
    (passwordFromChild: string) => {
      setPassword(passwordFromChild)
    },
    []
  );

  const handleLogin = async () => {
    try {
      console.log('entered log in try')
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        <CustomToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Error"
        message="An error occurred"
        variant="warning"
      />
      } else {
        <CustomToast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Logged In"
        message="An error occurred"
        variant='success'
      />
        setUser(data.user)
        setSession(data.session)
        console.log('data.session: ', data.session)
        console.log('signed in');
        navigate("/myprofiles");
      }
    } catch (err) {
      throw err;
    } finally {
      console.log('entered log in finally')
      setEmail('')
      setPassword('')
      setLoading(false);
    }
  }

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      })
      if (error) {
        // toast({
        //   title: 'Error',
        //   position: 'top',
        //   description: error.message,
        //   status: 'warning',
        //   duration: 5000,
        //   isClosable: true
        // });
      } else {
        // toast({
        //   title: 'Success',
        //   position: 'top',
        //   description: 'Account created',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true
        // })
        navigate("/myprofiles");
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
    <Container className="py-5"
     >
      <Row className="justify-content-center"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '70%',
        left: '15%',
        position: 'relative',
        
      }}
      >
        <Col lg="6">
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
