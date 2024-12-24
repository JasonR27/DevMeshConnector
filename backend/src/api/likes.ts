// import express from 'express';
// import prisma from '../lib/prisma';
// import { auth } from '../middleware/auth';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY: string = process.env.SUPABASE_JWT_SECRET || 'default_secret_key';

// if (!SECRET_KEY) {
//   console.log('No Secret Key');
// } else {
//   console.log('login endpoint SECRET_KEY/JWT secret: ', SECRET_KEY);
// }

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const likes = await prisma.likes.findMany({});
//   res.status(200).json(likes);
// });

// router.post('/create', auth, async (req, res) => {
//   console.log('Entered create like endpoint');

//   const { commentId, postId } = req.body;

//   const token = req.cookies.token;
//   let userId;
//   let userName;

//   jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     userId = decoded.id;
//     userName = decoded.name;
//   });

//   console.log('create like endpoint userId endpoint user id: ', userId);

//   try {

//     const user = await prisma.users.findUnique({
//       where: { id: userId },
//     });

//     const profile = await prisma.profiles.findUnique({
//       where: { userId: user?.id },
//     });

//     const profileId = profile?.id as string;

//     // const result = await prisma.likes.create({
//     //   data: {
//     //     postId: postId,
//     //     profileId: profileId,
//     //     userId: user?.id as string,
//     //   },
//     // });
//     const existingLike = await prisma.likes.findUnique({ where: { profileId_postId: { profileId: profileId, postId: postId, }, }, }); if (existingLike) { await prisma.likes.delete({ where: { id: existingLike.id }, }); return res.status(200).json({ message: 'Like removed' }); } else { const result = await prisma.likes.create({ data: { postId: postId, profileId: profileId, userId: user?.id as string, }, }); return res.status(200).json(result); }

//     res.status(200).json(result);
//   } catch (error) {
//     return res.status(400).json({ error: 'Unauthorized' });
//   }
// });

// export default router;


import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY: string = process.env.SUPABASE_JWT_SECRET || 'default_secret_key';

if (!SECRET_KEY) {
  console.log('No Secret Key');
} else {
  console.log('login endpoint SECRET_KEY/JWT secret: ', SECRET_KEY);
}

const router = express.Router();

router.get('/', async (req, res) => {
  const likes = await prisma.likes.findMany({});
  res.status(200).json(likes);
});

router.post('/create', auth, async (req, res) => {
  console.log('Entered create like endpoint');

  const { commentId, postId } = req.body;

  const token = req.cookies.token;
  let userId;
  // let userName;

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    userId = decoded.id;
    // userName = decoded.name;
  });

  console.log('create like endpoint userId endpoint user id: ', userId);

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    const profile = await prisma.profiles.findUnique({
      where: { id: user?.currentProfileId as string },
    });

    const profileId = profile?.id as string;

    const existingLike = await prisma.likes.findUnique({
      where: {
        profileId_postId: {
          profileId: profileId,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      console.log('removing existing like');
      await prisma.likes.delete({
        where: { id: existingLike.id },
      });
      return res.status(200).json({ message: 'Like removed' });
    } else {
      const result = await prisma.likes.create({
        data: {
          postId: postId,
          profileId: profileId,
          userId: user?.id as string,
        },
      });
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json({ error: 'Unauthorized' });
  }
});

export default router;
