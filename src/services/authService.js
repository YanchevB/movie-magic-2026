import userRepository from "../repositories/userRepository"

function register(userData) {
    return userRepository.create(userData)
}

const authService = {
    register,
}

export default authService