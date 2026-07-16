import { Router } from 'express';
import authService from '../services/authService';
import { isGuest } from '../middlewares/authMiddleware';

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})

authController.post('/register', isGuest, async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    await authService.register({ email, password, repeatPassword });

    res.redirect('/auth/login')
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

export default authController;