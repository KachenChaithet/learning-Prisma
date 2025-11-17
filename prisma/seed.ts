import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories: Prisma.CategoryCreateInput[] = [
    { name: 'programming' },
    { name: 'Dataengineering' },
    { name: 'davOps' },
    { name: 'frontend' },
    { name: 'backend' },
];

async function seed() {
    try {
        for (const category of categories) {
            await prisma.category.create({
                data: category,
            });
        }
        console.log('Seed finished!');
    } catch (error) {
        console.error('Seed failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
