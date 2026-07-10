import movieRepository from "../repositories/movieRepository.js";

async function getAll(filter = {}) {
    return await movieRepository.getAll(filter);
}

function create(movieData) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);

    return movieRepository.create(movieData);
}

async function getById(movieId) {
    const id =  Number(movieId);
    return await movieRepository.getById(id);
}

const movieService = {
    getAll,
    create,
    getById
}

export default movieService;