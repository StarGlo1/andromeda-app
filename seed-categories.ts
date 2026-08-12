// seed.ts
import { prisma } from './lib/prisma';

async function main() {
  const categories = [
    'Wax',
    'Wick',
    'Vessel',
    'Fragrance Oil',
    'Lid',
    'Label & Sticker',
    'Dust Cover',
    'Packaging',
    'Additive',
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    console.log(`✓ Added category: ${name}`);
  }

  console.log('All categories created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());