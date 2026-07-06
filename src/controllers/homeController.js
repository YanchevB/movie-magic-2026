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

homeController.get('/search', (req, res) => {
    res.render('search');
})

export default homeController;