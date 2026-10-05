const { PrismaClient } = require('./generated/prisma/client.ts');
require('dotenv').config()

const prisma = new PrismaClient();

async function main() {
  await prisma.waldoGame.createMany({
    data: [
      {name: 'Waldo', xStart: 39.955, yStart: 61.574, xEnd: 40.773, yEnd: 65.833},
      {name: 'Wizard', xStart: 77.1, yStart: 56.759, xEnd: 78.499, yEnd: 59.814},
      {name: 'Odlaw', xStart: 6.448, yStart: 68.333, xEnd: 7.833, yEnd: 70.555}
    ]
  })
  console.log("Seed succesful");
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
