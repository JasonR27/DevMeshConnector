import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SUPABASE_JWT_SECRET || 'default_secret_key';

const router = express.Router();

router.post('/create', auth, async (req, res) => {
  console.log('entered comments create endpoint');
  const { postId, content, img, audio, file } = req.body;
  console.log('content: ', content);
  const token = req.cookies.token;

  let userId;

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    userId = decoded.id;
  });

  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'An error occurred while creating the comment' });
  }
});

router.put('/edit/:id', auth, async (req, res) => {
  console.log('entered edit comment endpoint');

  const { id, content } = req.params;
  const token = req.cookies.token;

  console.log('smain id: ', id);

  if (!token) {
    return res.status(401).json({ valid: false, error: 'Invalid token' });
  }

  let userId;

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    userId = decoded.id;
  });

  try {
    const userExists = await prisma.users.findUnique({
      where: { id: userId },
    });


    if (!userExists) {
      console.log('user doesnt exist');
      return res.status(404).json({ error: 'User not found' });
    } else {
      await prisma.comments.update({
        where: { id },
        data: { content: content },
      });
      return res.status(200).json({ message: 'Main profile updated successfully', redirectUrl: '/profiles/myprofile' });
    }    
    // return res.status(201).json({ profile, redirectUrl: '/profiles/myprofiles' });
  } catch (error) {
    console.error('Error setting main profile:', error);
    return res.status(500).json({ error });
  }
});

// deletes a profile

router.delete('/delete/:id', auth, async (req, res) => {
  console.log('entered delete comment endpoint');
  const { id } = req.params;
  console.log('id: ', id);

  try {
    await prisma.comments.delete({
      where: { id },
    });

    return res.status(201).json({ redirectUrl: '/profiles/myprofiles' });

    // return res.status(200).json(profile);
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ error });
  }
});

export default router;
