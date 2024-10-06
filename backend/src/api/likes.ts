import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  const likes = await prisma.likes.findMany({});
  res.status(200).json(likes);
});

router.post('/create', auth, async (req, res) => {
  const { profileId, postId, userId } = req.body;
  try {
    const result = await prisma.likes.create({
      data: {
        postId: postId,
        profileId: profileId,
        profile: {
          connect: { id: profileId },
        },
        user: {
          connect: { id: userId }, // Connect the user to the user
        },
        post: {
          connect: { id: userId }, // Connect the post to the user
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Unauthorized' });
  }
});

export default router;
