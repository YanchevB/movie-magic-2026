import movieRepository from "../repositories/movieRepository.js";

async function getAll() {
    return await movieRepository.getAll();
}

const movieService = {
    getAll
}

export default movieService;