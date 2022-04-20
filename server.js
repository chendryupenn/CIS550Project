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
app.get('/movies', routes.top_movie_by_year)

// Route 3 - register as GET 
app.get('/movies', routes.top_movie_by_genre)

// Route 4 - register as GET 
app.get('/movies', routes.top_movie_by_director)

// Route 5 - register as GET 
app.get('/movies', routes.movie_id)

// Route 6 - register as GET 
app.get('/movies', routes.new_top_rated)

// Route 7 - register as GET 
app.get('/movies', routes.top_rated_by_demographics)

// Route 8 - register as POST 
app.post('/movies', routes.add_to_watchlist)

// Route 9 - register as GET 
app.get('/watchlist', routes.watchlist)

// Route 10 - register as GET 
app.get('/watchlist', routes.recommendation)

// Route 11 - register as GET 
app.get('/main', routes.all_movies)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
