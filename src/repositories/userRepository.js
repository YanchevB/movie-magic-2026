import { prisma } from '../lib/prisma.js'

function create(userData) {
    const result = prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password
        }
    });

    return result;
}

const userRepository = {
    create,
}

export default userRepository;