import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

homeController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
})

export default homeController;