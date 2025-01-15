// import { PrismaClient, Prisma } from '@prisma/client';


// const prisma = new PrismaClient();

// // const userData: Prisma.ProfilesCreateInput[] = [
// //   {
// //     username: 'John Doe',
// //     authorEmail: 'johndoe@gmail.com',
// //     website: 'johndoe.io',
// //     company: 'John&Co',
// //     posts: {
// //       create: [
// //         {
// //           userId: '1',
// //           title: 'Join the Prisma Slack',
// //           content: 'https://slack.prisma.io',
// //           published: true,
// //           viewCount: 0,
// //         },
// //         {
// //           userId: '1',
// //           title: 'Join the other community',
// //           content: 'https://slack.prisma.io',
// //           published: true,
// //           viewCount: 0,
// //         },
// //       ],
// //     },
// //     user: {
// //       create: undefined,
// //       connectOrCreate: undefined,
// //       connect: undefined,
// //     },
// //   },
// //   {
// //     username: 'Matthew Laing',
// //     authorEmail: 'matthewlaing@gmail.com',
// //     website: 'matthewlaing.io',
// //     company: 'Matthew&Co',
// //     posts: {
// //       create: [
// //         {
// //           userId: '3',
// //           title: 'Join the Prisma Slack',
// //           content: 'https://slack.prisma.io',
// //           published: true,
// //           viewCount: 0,
// //         },
// //       ],
// //     },
// //     user: {
// //       create: undefined,
// //       connectOrCreate: undefined,
// //       connect: undefined,
// //     },
// //   },
// //   {
// //     username: 'Randy Smith',
// //     authorEmail: 'randysmith@gmail.com',
// //     website: 'radnysmith.io',
// //     company: 'Randy&Co',
// //     posts: {
// //       create: [
// //         {
// //           userId: '2',
// //           title: 'Ask a question about Prisma on GitHub',
// //           content: 'https://www.github.com/prisma/prisma/discussions',
// //           published: true,
// //           viewCount: 128,
// //         },
// //       ],
// //     },
// //     user: {
// //       create: undefined,
// //       connectOrCreate: undefined,
// //       connect: undefined,
// //     },
// //   },
// // ];

// async function main() {
//   console.log('Start seeding ...');
//   // for (const u of userData) {
//   //   const user = await prisma.profiles.create({
//   //     data: u,
//   //   });
//   //   console.log(`Created user with id: ${user.id}`);
//   // }
//   console.log('Seeding finished.');
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.users.create({
    data: {
      id: 'user1',
      name: 'Alice',
      email: 'alice@example.com',
      username: 'alice',
      passwordHash: 'securepassword1',
      role: 'user',
    },
  });

  const user2 = await prisma.users.create({
    data: {
      id: 'user2',
      name: 'Bob',
      email: 'bob@example.com',
      username: 'bob',
      passwordHash: 'securepassword2',
      role: 'user',
    },
  });

  // Create profiles
  const profile1 = await prisma.profiles.create({
    data: {
      id: 'profile1',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user1.id,
      username: 'aliceProfile',
      website: 'https://alice.com',
      company: 'Alice Inc.',
      authorEmail: 'alice@example.com',
      isPublic: true,
      programmingLanguages: ['JavaScript', 'TypeScript'],
    },
  });

  const profile2 = await prisma.profiles.create({
    data: {
      id: 'profile2',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user2.id,
      username: 'bobProfile',
      website: 'https://bob.com',
      company: 'Bob Ltd.',
      authorEmail: 'bob@example.com',
      isPublic: false,
      programmingLanguages: ['Python', 'Django'],
    },
  });

  // Create posts
  const post1 = await prisma.posts.create({
    data: {
      id: 'post1',
      userId: user1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Alice\'s First Post',
      content: 'This is the content of Alice\'s first post',
      published: true,
      viewCount: 100,
      profileId: profile1.id,
    },
  });

  const post2 = await prisma.posts.create({
    data: {
      id: 'post2',
      userId: user2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Bob\'s First Post',
      content: 'This is the content of Bob\'s first post',
      published: false,
      viewCount: 50,
      profileId: profile2.id,
    },
  });

  // Create comments
  const comment1 = await prisma.comments.create({
    data: {
      id: 'comment1',
      postId: post1.id,
      userId: user2.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'Nice post, Alice!',
      ProfileName: profile2.username,
    },
  });

  const comment2 = await prisma.comments.create({
    data: {
      id: 'comment2',
      postId: post2.id,
      userId: user1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'Thanks, Bob!',
      ProfileName: profile1.username,
    },
  });

  // Create likes
  const like1 = await prisma.likes.create({
    data: {
      id: 'like1',
      postId: post1.id,
      userId: user2.id,
      profileId: profile2.id,
    },
  });

  const like2 = await prisma.likes.create({
    data: {
      id: 'like2',
      postId: post2.id,
      userId: user1.id,
      profileId: profile1.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
