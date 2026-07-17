import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        
        req.user = decodedToken;
        // Convention from handlebars for keeping constants during the request/response life cycle
        res.locals.user = decodedToken;
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }

    next();
}

export function isAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isGuest(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}