import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/tokenUtils";

async function register(userData) {
    const createdUser = await userRepository.create(userData);

    const token = generateAuthToken(createdUser);

    return token;
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

    const token = generateAuthToken(user);
    return token;
}

const authService = {
    register,
    login
}

export default authService