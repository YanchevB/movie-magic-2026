import artistRepository from "../repositories/artistRepository";

function create(artistData) {
   artistData.age = Number(artistData.age);

   return artistRepository.create(artistData);
}

function getAll(filter = {}) {
    return artistRepository.getAll(filter);
}

const artistService = {
    create,
    getAll
}

export default artistService;