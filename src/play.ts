import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.source.create({
        data: {
            name: '165',
            description: '165'
        }
    })
}

main();