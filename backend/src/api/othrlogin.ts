import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const router = express();
const prisma = new PrismaClient();
router.use(bodyParser.json());

// const SECRET_KEY = process.env.SUPABASE_JWT_SECRET;

const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || 'default_secret_key';
// const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || process.env.REACT_APP_SUPABASE_JWT_SECRET;




router.post('/login', async (req, res) => {
  console.log('Entered login endpoint');
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email } });
  console.log();

  // if (user) {
  //   res.status(401).json({ error: 'Invalid credentials' });    
  // }

  // req.session.user = user;
  // return res.redirect('/myprofiles'); // Redirecting to dashboard


  console.log('user?.passwordHash', user?.passwordHash);
  console.log('user?.email', user?.email);

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    console.log('token', token);
    // res.json({ token });
    // return res.redirect('/myprofiles');
    console.log('token assigned succesfully');
    router.use(session({
      secret: token, // Change this to your own secret
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    }));

    // user.session = session;



    await prisma.users.update({
      where: { email },
      data: { session: token },
    });

    // res.json(user.session);
    // res.redirect('/myprofiles');

    if (!SECRET_KEY) {
      console.log('No Secret Key');
      //   throw new Error('SECRET_KEY is not defined');
    } else {
      console.log('SECRET_KEY: ', SECRET_KEY);
      console.log('token: ', token);
    }
    // res.redirect('/myprofiles');
    if (req.session) {
      req.session.id = token;
    }

    return res.json({ token, redirectUrl: '/myprofiles' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});



// handlelogin old

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
        // <CustomToast show={showToast} onClose={(): void => {setShowToast(false)} } title={'toast  login error title here'} message={'toast login error message here'} variant={'warning'} />
      } else {
        setToastMessage({
          title: 'Logged In',
          message: 'Successfully Logged In',
          variant: 'success',
        });
        setShowToast(true);
        // <CustomToast show={showToast} onClose={(): void => {setShowToast(false)} } title={'toast  login error title here'} message={'toast login error message here'} variant={'warning'} />
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

};