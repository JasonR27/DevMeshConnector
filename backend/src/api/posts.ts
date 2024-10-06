import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await prisma.posts.findMany({
    include: {
      profile: {
        select: {
          authorEmail: true,
          picture: { select: { avatarUrl: true } },
        },
      },
      likes: { select: { id: true } },
    },
  });
  res.status(200).json(posts);
});

router.post('/create', auth, async (req, res) => {
  const { title, content, profileId, userId } = req.body; // Ensure userId is included in the request body
  try {
    const result = await prisma.posts.create({
      data: {
        title,
        content,
        profile: {
          connect: { id: profileId },
        },
        user: {
          connect: { id: userId }, // Connect the post to the user
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Unauthorized' });
  }
});


// router.post('/create', auth, async (req, res) => {
//   const { title, content, profileId } = req.body;
//   try {
//     const result = await prisma.posts.create({
//       data: {
//         title,
//         content,
//         profileId: profileId,
//       },
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     return res.status(400).json({ error: 'Unauthorized' });
//   }
// });

// router.get('/post/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await prisma.posts.findFirst({
//       where: {
//         id: id,
//       },
//       include: {
//         profile: {
//           select: {
//             authorEmail: true,
//             picture: { select: { avatarUrl: true } },
//           },
//         },
//         likes: { select: { id: true } },
//       },
//     });
//     res.json(post);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

router.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: id, // No need to convert to String
      },
      include: {
        profile: {
          select: {
            authorEmail: true,
            picture: { select: { avatarUrl: true } },
          },
        },
        likes: { select: { id: true } },
      },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post with ID ${id} does not exist in the database` });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});


export default router;
