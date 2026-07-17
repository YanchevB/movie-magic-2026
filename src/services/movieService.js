import movieRepository from "../repositories/movieRepository.js";

async function getAll(filter = {}) {
    return await movieRepository.getAll(filter);
}

function create(movieData, userId) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId;

    return movieRepository.create(movieData);
}

async function getById(movieId) {
    const id =  Number(movieId);
    return await movieRepository.getById(id);
}

async function attachArtist(movieId, artistId) {
    movieId = Number(movieId);
    artistId = Number(artistId);
    const result = await movieRepository.attachArtist(movieId, artistId)

    return result;
}

async function deleteMovie(movieId, userId) {
    const movie = await movieRepository.getById(movieId);

    if (!movie) {
        throw new Error('Movie not found!');
    }

    if (movie.userId !== userId) {
        throw new Error('Unauthorized!');
    }

    await movieRepository.deleteMovie(movieId, userId);
}

const movieService = {
    getAll,
    create,
    getById,
    attachArtist,
    deleteMovie
}

export default movieService;