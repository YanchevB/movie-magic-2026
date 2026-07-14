import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie' });
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    
    await movieService.create(newMovie);
    res.redirect('/');
})

//Details page
movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId);

    //Quick and basic solution to render the stars | TODO: Fix it 
    const rating = Math.floor(movie.rating);
    const ratingStars = '&#x2605;'.repeat(rating);

    res.render('movies/details', { movie, pageTitle: movie.title, ratingStars });
})

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    res.render('movies/attach', { pageTitle: 'Attach Artist', movie });
})

export default movieController;