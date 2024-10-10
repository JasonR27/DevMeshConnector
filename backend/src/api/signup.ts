import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';

// const app = express();
const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10;

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
      },
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error: any) {
    console.log('error: ', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    // res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;


