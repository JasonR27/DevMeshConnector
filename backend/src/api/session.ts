import express from 'express';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import 'express-session';
import session from 'express-session';
dotenv.config();

// const SECRET_KEY: string | undefined = process.env.VITE_SUPABASE_JWT_SECRET;

const SECRET_KEY: string | undefined = process.env.VITE_SUPABASE_JWT_SECRET || 'default_secret_key';

declare module 'express-session' {
  interface SessionData {
    user: { [key: string]: any };
    token: string;
  }
}


const router = express();
// const prisma = new PrismaClient();
router.use(bodyParser.json());


// Endpoint to retrieve session data
router.get('/session', (req, res) => {
  const token = req.session.token;
  
  if (!token) {
    return res.status(401).json({ error: 'No session found' });
  }
  
  try {
    const decoded = jwt.verify(token, 'your-jwt-secret');
    return res.status(200).json({ session: decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid session' });
  }
});

router.get('/verify-session', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
    
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/createsession', (req, res) => {  
    
});
  
export default router;