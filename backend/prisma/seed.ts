import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.ProfilesCreateInput[] = [
  {
    
    username: 'John Doe',
    authorEmail: 'johndoe@gmail.com',
    website: 'johndoe.io',
    company: 'John&Co',
    posts: {
      create: [
        {
          user_Id: 1,   
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
        {
          user_Id: 1,
          title: 'Join the other community',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    username: 'Matthew Laing',
    authorEmail: 'matthewlaing@gmail.com',
    website: 'matthewlaing.io',
    company: 'Matthew&Co',
    posts: {
      create: [
        {
          user_Id: 3,
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    username: 'Randy Smith',
    authorEmail: 'randysmith@gmail.com',
    website: 'radnysmith.io',
    company: 'Randy&Co',
    posts: {
      create: [
        {
          user_Id: 2,
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
        },
      ],
    },
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const u of userData) {
    const user = await prisma.profiles.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });