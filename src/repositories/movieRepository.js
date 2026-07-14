import { write } from 'fs';
import fs from 'fs/promises';
import { prisma } from '../lib/prisma.js'

async function readDb(collection) {
    const content = await fs.readFile('./src/db.json', { encoding: 'utf-8' });
    const db = JSON.parse(content);

    if (collection && !db.hasOwnProperty(collection)) {
        throw new Error('No collection available');
    }

    return collection ? db[collection] : db;
}

async function writeDb(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', content, { encoding: 'utf-8' });
}

async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();

    //TODO: Implement db filtering instead of filtering in memory

    if (filter.search) {
        movies = movies.filter(m => m.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    if (filter.genre) {
        movies = movies.filter(m => m.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }

    if (filter.year) {
        movies = movies.filter(m => m.year.toLowerCase().includes(filter.year.toLowerCase()));
    }

    return movies;
}

async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: {
            artists: true
        }
    });

    if (!movie) {
        throw new Error('No movie found!')
    }

    return movie;
}

async function create(movieData) {
    const movie = await prisma.movie.create({
        data: movieData
    });

    return movie;
}

async function attachArtist(movieId, artistId) {
    const result = await prisma.movie.update({
        where: { id: movieId },
        data: {
            artists: {
                connect: { id: artistId }
            }
        }
    });

    return result;
}

const movieRepository = {
    getAll,
    create,
    getById,
    attachArtist
};

export default movieRepository;