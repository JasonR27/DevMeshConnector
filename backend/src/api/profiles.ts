import express from 'express';
import prisma from '../lib/prisma';
// import { User } from '@supabase/supabase-js';

const router = express.Router();

router.get('/', async (req, res) => {
  const profiles = await prisma.profiles.findMany({
    include: {
      programmingLanguages: {
        select: {
          language: true,
        },
      },
      picture: {
        select: {
          avatarUrl: true,
        },
      },
    },
  });
  res.status(200).json(profiles);
});

// router.post('/create', async (req, res) => {
//   console.log('req.body', req.body);
//   const { username, userId, website, authorEmail, programmingLanguages, company } = req.body;

//   const result = await prisma.profiles.create({
//     data: {
//       user: {
//         connect: { id: userId }, // Connect the post to the user
//       },
//       username,
//       website,
//       authorEmail,
//       company,
//       programmingLanguages: {
//         connectOrCreate: programmingLanguages.map((lang: string, id: number) => ({
//           create: { language: lang },
//           where: { id: id },
//         })),
//       },
//     },
//   });
//   res.json(result);
// });

router.post('/create', async (req, res) => {
  console.log('console.log(req.body)', req.body);
  const { username, userId, website, authorEmail, programmingLanguages, company } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {

    // Check if the user exists
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('userId: ', userId);

    // if (!User) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    console.log('userId: ', userId);

    const result = await prisma.profiles.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        username,
        website,
        authorEmail,
        company,
        programmingLanguages: {
          connectOrCreate: programmingLanguages.map((language: any) => ({
            create: { language },
            where: {
              language,
              id: userId,
            },
          })),
        },
      },
    });
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Error creating profile:', error); // Log the error details
    res.status(500).json({ error: error.message });
  }
  // catch (error: any) {
  //   res.status(500).json({ error: error.message });
  // } 

});

router.put('/updateById/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const { username, website, company, programmingLanguages, isPublic } = req.body;

  // we delete first all record with profileId
  await prisma.$transaction([prisma.programmingLanguages.deleteMany({ where: { profileId: profileId } })]);

  // then we repopulate programmingLanguages
  const profileUpdated = await prisma.profiles.update({
    where: { id: profileId },
    data: {
      username: username,
      website: website,
      company: company,
      isPublic: isPublic,
      programmingLanguages: {
        connectOrCreate: programmingLanguages.map((lang: string) => ({
          create: { language: lang },
          where: { id: Number(profileId) },
        })),
      },
    },
  });

  res.json(profileUpdated);
});

router.get('/findProfileByEmail/:authorEmail', async (req, res) => {
  const { authorEmail } = req.params;

  try {
    console.log('entered try');
    console.log('authorEmail: ', authorEmail);
    const profile = await prisma.profiles.findFirst({
      where: { authorEmail },
      include: {
        programmingLanguages: {
          select: {
            language: true,
          },
        },
        picture: { select: { avatarUrl: true } },
      },
    });
    res.json(profile);
  } catch (error) {
    console.log('entered catch');
    res.json({ error: `Profile with authorEmail ${authorEmail} does not exist in the database` });
  }
});

router.put('/publishProfile/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const profileUpdated = await prisma.profiles.update({
    where: { id: profileId },
    data: { isPublic: true },
  });
  res.json(profileUpdated);
});

router.get('/:profileId', async (req, res) => {
  const { profileId } = req.params;

  const profile = await prisma.profiles.findFirst({
    where: { id: profileId },
  });
  res.json(profile);
});

export default router;
