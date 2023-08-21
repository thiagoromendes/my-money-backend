import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//password = 123456

async function main() {
  await prisma.user.upsert({
    where: { email: 'thiagoromendes@gmail.com' },
    update: {},
    create: {
      fullName: 'Thiago Mendes',
      email: 'thiagoromendes@gmail.com',
      password: '$2b$10$H/I3NVQ/4mmYzw6usT4HYOMun5.IWf8zkKTwX54vVbrzzpReaw30i',
      roles: 'administrator',
    },
  });
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
