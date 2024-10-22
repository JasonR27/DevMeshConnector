// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
// import bodyParser from 'body-parser';
// import * as dotenv from 'dotenv';
// import 'express-session';
// // import session from 'express-session';
// dotenv.config();

// declare module 'express-session' {
//   interface SessionData {
//     user: { [key: string]: any };
//     token: string;
//   }
// }

// const router = express();
// const prisma = new PrismaClient();
// router.use(bodyParser.json());

// // const SECRET_KEY = 'alskjdlkasjdlkjasihs90r845r54f3sdf34s3dfh609845kj';

// const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || 'default_secret_key';
// // const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || process.env.REACT_APP_SUPABASE_JWT_SECRET;

// if (!SECRET_KEY) {
//   console.log('No Secret Key');
//   //   throw new Error('SECRET_KEY is not defined');
// } else {
//   console.log('SECRET_KEY: ', SECRET_KEY);
// }

// router.post('/login', async (req, res) => {
//   console.log('Entered login endpoint');
//   const { email, password } = req.body;
//   console.log('email: ', email);
//   const user = await prisma.users.findUnique({ where: { email } });

//   if (user && await bcrypt.compare(password, user.passwordHash)) {
//     console.log('user.id: ', user.id);
//     const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1m' });
//     // const token = jwt.sign({ userId: user.id }, 'fake secret key', { expiresIn: '1m' });
//     console.log('token', token);

//     // router.use(session({
//     //   secret: token, // Change this to your own secret
//     //   resave: false,
//     //   saveUninitialized: true,
//     //   cookie: { secure: true },
//     //   // user: user,
//     //   // token: token,
//     // }));

//     // await prisma.users.update({
//     //   where: { email },
//     //   data: { session: ' ' },
//     // });

//     await prisma.users.update({
//       where: { email },
//       data: { session: token },
//     });

//     // req.session = session;

//     // req.session.user = user;
//     // req.session.token = token;

//     console.log('new token assigned successfully');
//     // return res.json({ token, redirectUrl: '/myprofiles' });
//     return res.json({
//       token,
//       user: { id: user.id, email: user.email, role: user.role },
//       redirectUrl: '/myprofiles',
//     });

//   } else {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// router.post('/logout', async (req, res) => {
//   console.log('entering logout endpoint')

//   const { email } = req.body;

//   console.log('email: ', email);

//   try {

//     await prisma.users.update({
//       where: { email },
//       data: { session: '' },
//     });

//     console.log('User signed out');

//     return res.json({
//       redirectUrl: '/myprofiles',
//     });
//   } catch {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// export default router;

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express();
const prisma = new PrismaClient();
router.use(bodyParser.json());

const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || 'default_secret_key';

if (!SECRET_KEY) {
  console.log('No Secret Key');
} else {
  console.log('SECRET_KEY: ', SECRET_KEY);
}

router.post('/login', async (req, res) => {
  console.log('Entered login endpoint');
  const { email, password } = req.body;
  console.log('email: ', email);
  
  const user = await prisma.users.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    // Ensure the user ID is unique
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Generated token for user ID:', user.id);
    
    await prisma.users.update({
      where: { email },
      data: { session: token }, // Store the token in the user's session
    });

    console.log('New token assigned successfully');
    return res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
      redirectUrl: '/myprofiles',
    });

  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// router.post('/logout', async (req, res) => {
//   console.log('Entering logout endpoint');
//   const { email } = req.body;
//   console.log('email: ', email);

//   try {
//     await prisma.users.update({
//       where: { email },
//       data: { session: '' },
//     });

//     console.log('User  signed out');
//     return res.json({
//       redirectUrl: '/myprofiles',
//     });
//   } catch {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

router.post('/logout', async (req, res) => {
  console.log('Entering logout endpoint');
  const { email } = req.body;
  console.log('email: ', email);

  try {
    // Attempt to update the user's session to an empty string
    const updatedUser  = await prisma.users.update({
      where: { email },
      data: { session: '' }, // Clear the session
    });

    console.log('User  signed out successfully:', updatedUser );
    return res.json({
      redirectUrl: '/myprofiles',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ error: 'An error occurred while logging out.' });
  }
});

export default router;