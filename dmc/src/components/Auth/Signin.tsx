import {
  Container,
  Box,
  TextField,
  Tabs,
  Tab,
  Typography,
  Button
} from '@mui/material';
import { useState, SetStateAction } from 'react';
import CustomToast from '../CustomToast';
import { useMutationsContext } from '../../context/MutationsContext';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const navigate = useNavigate();
  // Hooks for signup state management
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [authButtonState, setAuthButtonState] = useState(true);
  const [magicEmail, setMagicEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const [newUser, setNewUser] = useState<IUser>(null);

  const mutations = useMutationsContext(); 

  const handleRegister = async () => {
    const user = { email, password, username, name };
    try {
      await mutations.createMutations.registerUser.mutate(user);
      // history.push('/myprofiles');
      navigate('/myprofiles');
      // window.location.href = '/myprofiles';
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleLogin = async () => {
    console.log('entered handle login')
    const user = { email, password };
    try {
      await mutations.verifySensitiveDataMutations.logInUser.mutate(user);
      setToastMessage({
        title: 'Logged In',
        message: 'Successfully Logged In',
        variant: 'success',
      });
      setShowToast(true);
      navigate('/myprofiles');      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value);
  const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value);
  const handleNameChange = (e: { target: { value: SetStateAction<string> } }) => setName(e.target.value);
  const handleUsernameChange = (e: { target: { value: SetStateAction<string> } }) => setUsername(e.target.value);
  const handleMagicEmailChange = (e: { target: { value: SetStateAction<string> } }) => setMagicEmail(e.target.value);

  return (
    // <QueryClientProvider client={queryClient}>
      <Container style={{
        position: 'relative',
        zIndex: 13,
      }}>
        <Box py={5}>
          <Box display="flex" justifyContent="center">
            {/* <Box width={1} border={1} borderColor="primary.main"> */}
            <Box
                  flex={1}
                  sx={{
                    maxWidth: '600px',
                    minWidth: '300px', 
                    margin: 'auto', 
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 5,
                  }}
                >
              <Box textAlign="center" mb={4}>
                <Typography variant="h4">
                  {!authButtonState ? 'Register a new account' : 'Sign in to your account'}
                </Typography>
                <Typography variant="body1">
                  {authButtonState ? "Don't have an account?" : 'Already a User?'}{' '}
                  <Button color="primary" onClick={() => setAuthButtonState(!authButtonState)}>
                    {authButtonState ? 'Sign up' : 'Log in'}
                  </Button>
                </Typography>
              </Box>
              <Box p={4} bgcolor="light" borderRadius={1} boxShadow={1}>
                <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                  <Tab label="Username/Password" />
                  <Tab label="Magic Link" />
                </Tabs>
                {activeTab === 0 && (
                  <Box mt={3}>
                    <form noValidate autoComplete="on">
                      <TextField
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {!authButtonState && (
                        <>
                          <TextField
                            fullWidth
                            margin="normal"
                            id="name"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                          />
                        </>
                      )}
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={!authButtonState ? handleRegister : handleLogin}
                        disabled={emailDisabled || !password}
                      >
                        {loading ? 'Loading...' : (!authButtonState ? 'Register' : 'Sign in')}
                      </Button>
                    </form>
                  </Box>
                )}
                {activeTab === 1 && (
                  <Box mt={3}>
                    <form noValidate autoComplete="on">
                      <TextField
                        fullWidth
                        margin="normal"
                        id="magicEmail"
                        label="Email address"
                        type="email"
                        value={magicEmail}
                        onChange={handleMagicEmailChange}
                      />
                      {/* Uncomment and implement magic link logic if needed
                      <Button fullWidth variant="contained" color="primary" onClick={() => handleLoginWithMagic(magicEmail)} disabled={magicEmailDisabled}>
                        {loading ? 'Sending magic link ...' : 'Send magic link'}
                      </Button>
                      */}
                    </form>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {toastMessage && (
            <CustomToast
              show={showToast}
              onClose={() => setShowToast(false)}
              title={toastMessage.title}
              message={toastMessage.message}
              variant={toastMessage.variant}
            />
          )}
        </Box>
      </Container>
    // </QueryClientProvider>
  );
};

export default Signin;
