import config from './config.json'

const getAllMovies = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movies/`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPosters = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/posters?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMovie = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movie?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getTopRated = async (Gender, Age) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movies?Gender=${Gender}&Age=${Age}`, {
        method: 'GET',
    })
    return res.json()
}

const addToWatchlist = async (id, title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/addWatchlist?id=${id}&title=${title}`, {
        method: 'GET',
    })
    return res.json()
}

const getTitle = async (title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/movies?Title=${title}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecommenations = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movieRecommendations`, {
        method: 'GET',
    })
    return res.json()
}

const getGenre = async (genre) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/moviesByGenre?genre=${genre}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getAllMovies,
    getAllPosters,
    getMovie,
    getTopRated,
    addToWatchlist,
    getTitle,
    getRecommenations,
    getGenre
}