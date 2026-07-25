import { Router } from 'express';
import authService from '../services/authService';
import { isAuth, isGuest } from '../middlewares/authMiddleware';
import { createUserSchema  } from '../schemas/userSchema';
import { getErrorMessage } from '../utils/errorUtils';

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})

authController.post('/register', isGuest, async (req, res) => {
    try {
        const userData = createUserSchema.parse(req.body);

        const token = await authService.register(userData);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');

    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/register', { error });
    }
})

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
})

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login({ email, password });

    // Always put httpOnly, it means that the browser JS cannot use the cookie
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/')
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;