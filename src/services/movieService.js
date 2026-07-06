import movieRepository from "../repositories/movieRepository.js";

async function getAll() {
    return await movieRepository.getAll();
}

function create(movieData) {
    return movieRepository.create(movieData);
}

async function getById(movieId) {
    return await movieRepository.getById(movieId);
}

const movieService = {
    getAll,
    create,
    getById
}

export default movieService;