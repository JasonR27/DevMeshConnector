import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const router = express();
const prisma = new PrismaClient();
router.use(bodyParser.json());

// const SECRET_KEY = process.env.SUPABASE_JWT_SECRET;

const SECRET_KEY: string = process.env.REACT_APP_SUPABASE_JWT_SECRET || 'default_secret_key';



if (!SECRET_KEY) {
  console.log('No Secret Key');
  //   throw new Error('SECRET_KEY is not defined');
} else {
  console.log('SECRET_KEY: ', SECRET_KEY);
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
    console.log('token assigned succesfully');
    if (!SECRET_KEY) {
      console.log('No Secret Key');
      //   throw new Error('SECRET_KEY is not defined');
    } else {
      console.log('SECRET_KEY: ', SECRET_KEY);
    }
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
    
  }
});

export default router;