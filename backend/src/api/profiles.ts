import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';
import cookieParser from 'cookie-parser';
// import jwt from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies
router.use(cookieParser()); // For parsing cookies

// Your routes
router.get('/', async (req, res) => {
  const profiles = await prisma.profiles.findMany({
    include: {
      picture: {
        select: {
          avatarUrl: true,
        },
      },
    },
  });
  res.status(200).json(profiles);
});

const SECRET_KEY: string = process.env.SUPABASE_JWT_SECRET || 'default_secret_key';

if (!SECRET_KEY) {
  console.log('No Secret Key');
} else {
  console.log('login endpoint SECRET_KEY/JWT secret: ', SECRET_KEY);
}

router.post('/create', auth, async (req, res) => {
  console.log('entering create profile endpoint');
  // console.log('console.log(req.body)', req.body);
  const token = req.cookies.token;
  
  console.log('Extracted token: ', token);

  if (!token) {
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }

  let userId;
  let authorEmail = '';

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    // Attach the decoded information to the request object
    userId = decoded.id;
    authorEmail = decoded.email; // Assuming the ID is stored in the token payload
    console.log('decoded: ', decoded, ' ', 'decoded.id: ', decoded.id, 'decoded.email: ', decoded.email);
    // next(); // Proceed to the next middleware or route handler
  }); 

  const { username, website, programmingLanguages, company } = req.body;

  if (!authorEmail) {
    console.log('author email not found');
    return res.status(400).json({ error: 'authoremail is required' });
  } else {
    console.log('userId: ', userId);
  }

  if (!userId) {
    console.log('userId not found');
    return res.status(400).json({ error: 'User ID is required' });
  } else {
    console.log('userId: ', userId);
  }

  try {
    const userExists = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await prisma.profiles.create({
      data: {
        user: { connect: { id: userId } },
        username,
        website,
        authorEmail,
        company,
        programmingLanguages,
      },
    });

    // Ensure the cookie configuration
    res.cookie('profileCreated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour in milliseconds
    });

    return res.status(201).json(result);
  } catch (error: any) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ error: error.message });
  }
});


export default router;