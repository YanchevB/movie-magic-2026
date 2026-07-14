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

async function attachArtist(movieId, artistId) {
    movieId = Number(movieId);
    artistId = Number(artistId);
    const result = await movieRepository.attachArtist(movieId, artistId)

    return result;
}

const movieService = {
    getAll,
    create,
    getById,
    attachArtist
}

export default movieService;