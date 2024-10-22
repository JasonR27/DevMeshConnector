import express from 'express';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import 'express-session';
// import session from 'express-session';
dotenv.config();

const router = express();
// const prisma = new PrismaClient();
router.use(bodyParser.json());

const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || 'default_secret_key';

// router.get('/verifytoken', (req, res) => {
//   console.log('Entered verify token endpoint');
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ valid: false, error: 'No token provided' });
//   }

//   // const token = authHeader.split(' ')[1];
//   const token = authHeader;
//   console.log('token: ', token);
//   console.log('req: ', req.headers.authorization);

//   if (!token) {
//     return res.status(401).json({ valid: false, error: 'Invalid token' });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY); // Replace with your actual secret key
//     if (decoded) {
//       console.log('token is valid: ', decoded);
//       return res.json({ valid: true, decoded });
//     } else {

//     }

//   } catch (error) {
//     return res.status(401).json({ valid: false, error: 'Invalid token' });
//   }
// });

router.get('/verifytoken', (req, res) => {
  console.log('Entered verify token endpoint');
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  // Extracting the token from the Bearer token format
  const token = authHeader.split(' ')[1]; // This assumes the header is in the format "Bearer <token>"
  
  console.log('Extracted token: ', token);

  if (!token) {
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Ensure SECRET_KEY is correct
    console.log('Token is valid: ', decoded);
    return res.json({ valid: true, decoded });
  } catch (error) {
    console.error('Token verification error: ', error);
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});


export default router;
