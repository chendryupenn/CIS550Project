const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/main', routes.generic_movie_search)

// Route 2 - register as GET 
app.get('/moviesByYear', routes.top_movie_by_year)

// Route 3 - register as GET 
app.get('/moviesByGenre', routes.top_movie_by_genre)

// Route 4 - register as GET 
app.get('/moviesByDirector', routes.top_movie_by_director)

// Route 5 - register as GET 
app.get('/movie', routes.movie_id)

// Route 6 - register as GET 
app.get('/newTopRated', routes.new_top_rated)

// Route 7 - register as GET 
app.get('/movies', routes.top_rated_by_demographics)

// Route 8 - register as POST 
app.get('/addWatchlist', routes.add_to_watchlist)

// Route 9 - register as GET 
app.get('/watchlist', routes.watchlist)

// Route 10 - register as GET 
app.get('/recommendation', routes.recommendation)

// Route 11 - register as GET 
app.get('/allMovies', routes.all_movies)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
