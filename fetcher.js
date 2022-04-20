import config from './config.json'

const getAllMovies = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/movies/${league}?page=${page}&pagesize=${pagesize}`, {
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


const getTitle = async (title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/movies?Title=${title}`, {
        method: 'GET',
    })
    return res.json()
}















export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch
}