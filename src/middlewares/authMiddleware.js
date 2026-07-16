
export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    next();
}