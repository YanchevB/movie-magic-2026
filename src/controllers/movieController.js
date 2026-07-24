import { Router } from "express";
import movieService from "../services/movieService.js";
import artistService from "../services/artistService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { createMovieSchema } from "../schemas/movieSchema.js";
import * as z from "zod";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    const categoryOptions = prepareCategoryViewData({})
    res.render('movies/create', { categoryOptions, pageTitle: 'Create Movie' });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    try {
        const movieData = createMovieSchema.parse(newMovie);

        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;

            const categoryOptions = prepareCategoryViewData(newMovie);

            const firstError = Object.values(errors).flat().at(0)

            res.status(400).render('movies/create', { movie: req.body, error: firstError, categoryOptions, pageTitle: 'Create Movie' });
        }
    }
    
})

//Details page
movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user.id;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;

    //Quick and basic solution to render the stars | TODO: Fix it 
    const rating = Math.floor(movie.rating);
    const ratingStars = '&#x2605;'.repeat(rating);

    res.render('movies/details', { movie, pageTitle: movie.title, ratingStars, isOwner });
})

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) })

    res.render('movies/attach', { pageTitle: 'Attach Artist', movie, artists });
})

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    await movieService.deleteMovie(movieId, userId); 

    res.redirect('/')
})

function prepareCategoryViewData(movie) {
    const categories = ['TV Show', 'Movie', 'Documentary', 'Animation', 'Short Film'];

    const categoryOptions = categories.map(category => {
        const value = category.toLowerCase().replaceAll(' ', '-');
        const option = {
            value,
            label: category,
            selected: movie.category === value
        }
        return option;
    })

    return categoryOptions;
}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if (movie.userId !== userId) {
        return res.status(401).send('Unauthorized');
    }

    const categoryOptions = prepareCategoryViewData(movie);
    res.render('movies/edit', { pageTitle: 'Edit movie', movie, categoryOptions });
})

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
    const movieData = req.body

    await movieService.edit(movieId, movieData, userId);

    res.redirect('/');
})

export default movieController;