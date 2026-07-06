import movieRepository from "../repositories/movieRepository.js";

async function getAll() {
    return await movieRepository.getAll();
}

function create(movieData) {
    return movieRepository.create(movieData);
}

const movieService = {
    getAll,
    create
}

export default movieService;