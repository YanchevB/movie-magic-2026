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

    console.log(user);

}

const authService = {
    register,
    login
}

export default authService