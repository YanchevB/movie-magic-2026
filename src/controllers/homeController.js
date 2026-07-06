import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { movies, pageTitle: 'Home' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About'});
});

homeController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search' });
})

export default homeController;