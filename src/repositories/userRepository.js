import { prisma } from '../lib/prisma.js'

async function create(userData) {
    const result = await prisma.user.create({
        data: userData,
    });

    return result;
}

async function findByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    return user;
}

const userRepository = {
    create,
    findByEmail
}

export default userRepository;