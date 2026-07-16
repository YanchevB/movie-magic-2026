import { prisma } from '../lib/prisma.js'

async function create(userData) {
    const result = await prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password
        }
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