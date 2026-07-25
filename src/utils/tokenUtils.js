import jwt from "jsonwebtoken";

export function generateAuthToken(user) {
    // Issue token
    const payload = { id: user.id, email: user.email}

    const secret = 'SECRET_KEY'

    // TODO fix the secret key
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;
}   