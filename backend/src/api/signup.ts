import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';

// const app = express();
const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 15;

router.use(express.json()); 

router.post('/signup', async (req, res) => {
  console.log('Its entering router.post /signup endpoint');
  const { email, password, username, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        username: username,
        name: name,
        session: '',
        role: '',
      },
    });

    // Call the login endpoint with the new user's credentials
    const loginResponse = await fetch('http://localhost:8080/api/v1/auth/login', { // Replace with your actual backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Use the same email and password from signup
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      return res.status(201).json({ token: loginData.token, user: newUser, redirectUrl: '/myprofiles' });
    } else {
      return res.status(401).json({ error: 'Login failed after signup' });
    }
    
    // return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error: any) {
    console.log('error: ', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    // res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

