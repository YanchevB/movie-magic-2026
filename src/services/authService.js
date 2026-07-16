import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';

async function register(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const result = await userRepository.create({
        ...userData,
        password: hashPassword
    });

    return result;
}

async function login(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid username or password!');
    }
}

const authService = {
    register,
    login
}

export default authService