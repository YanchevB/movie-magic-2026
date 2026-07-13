import artistRepository from "../repositories/artistRepository";

function create(artistData) {
   artistData.age = Number(artistData.age);

   return artistRepository.create(artistData);
}

const artistService = {
    create
}

export default artistService;