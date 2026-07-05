import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import { Router } from 'express';

const routes = Router();

routes.use('/', homeController);
routes.use('/movies', movieController);

routes.get('*url', (req, res) => {
    res.render('404');
})

export default routes;