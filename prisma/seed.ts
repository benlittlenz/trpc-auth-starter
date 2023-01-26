import { PrismaClient, Job } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    await prisma.job.deleteMany();
    const amountOfUsers = 5000;

    const jobs: any = [];

    for (let i = 0; i < amountOfUsers; i++) {
        const job = {
            name: faker.name.jobTitle(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(["active", "inactive"]),
        };
        jobs.push(job);
    }

    const addUsers = async () => await prisma.job.createMany({ data: jobs });

    addUsers();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
