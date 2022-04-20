const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// ********************************************
//             Movie-SPECIFIC ROUTES
// ********************************************

//Route 1
//Main page general search box
async function generic_movie_search(req, res) {
    const generic_search_term = req.query.search;
    connection.query(
	`SELECT Movies.title, Movies.year, Movies.director, Movies.date_published
	FROM Movies
	WHERE title LIKE '${generic_search_term}' OR
      director LIKE '${generic_search_term}' OR
      genre LIKE '${generic_search_term}' OR
      date_published LIKE '${generic_search_term}' OR
      country LIKE '${generic_search_term}' OR
      description LIKE '${generic_search_term}';
`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 2
//Top rated movies by year
async function top_movie_by_year(req, res) {
    const movie_by_year = req.query.searchbyyear;
    connection.query(
	`SELECT Movies.title, Ratings.weighted_avg_vote
	FROM Movies JOIN Ratings R on Movies.imdb_id = R.imdb_id
	WHERE Movies.year = '${movie_by_year}'
	ORDER BY Ratings.weighted_avg_vote DESC;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 3
//Top rated movies bye genre
async function top_movie_by_genre(req, res) {
    const movie_by_genre = req.query.searchbygenre;
    connection.query(
	`SELECT Movies.title, Ratings.weighted_avg_vote
	FROM Movies JOIN Ratings R on Movies.imdb_id = R.imdb_id
	WHERE Movies.genre LIKE '${movie_by_genre}'
	ORDER BY Ratings.weighted_avg_vote DESC;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route 4
//Top rated movies bye director
async function top_movie_by_director(req, res) {
    const movie_by_director = req.query.searchbydirector;
    connection.query(
	`SELECT Movies.title, Ratings.weighted_avg_vote
	FROM Movies JOIN Ratings R on Movies.imdb_id = R.imdb_id
	WHERE Movies.director LIKE '${movie_by_director}'
	ORDER BY Ratings.weighted_avg_vote DESC;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 5 (handler)
// Search by movie ID
async function movie_id(req, res) {
    const movieID = req.query.id;
    connection.query(`SELECT M.imdb_id, M.title, M.year, genre, duration, country, language, director, actors, description, R.weighted_avg_vote as rating
    FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id WHERE M.imdb_id = '${movieID}';`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 6
// Top 20 most recent releases with ratings
async function new_top_rated(req, res) {
    connection.query(
	`SELECT Movies.title, Movies.date_published, Ratings.weighted_avg_vote
	FROM Movies JOIN Ratings R on Movies.imdb_id = R.imdb_id
	ORDER BY Movies.date_published DESC
	LIMIT 20;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 7 (handler)
// top rated movies returned for different demographics
async function top_rated_by_demographics(req, res) {
    const Gender = req.query.Gender ? req.query.Gender : 'NA'
    const Age = parseInt(req.query.Age ? req.query.Age : '0');   
    if (Gender == 'NA' && Age == 0) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.weighted_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'F' && Age == 0) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.females_allages_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'M' && Age == 0) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.males_allages_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'NA' && 0 < Age < 18) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.allgender_0age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'NA' && 18 <= Age < 30) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.allgenders_18age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'NA' && 30 <= Age < 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.allgenders_30age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'NA' && Age >= 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.allgenders_45age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'F' && 0 < Age < 18) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.females_0age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'F' && 18 <= Age < 30) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.females_18age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'F' && 30 <= Age < 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.females_30age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'F' && Age >= 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.females_45age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'M' && 0 < Age < 18) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.males_0age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'M' && 18 <= Age < 30) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.males_18age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'M' && 30 <= Age < 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.males_30age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (Gender == 'M' && Age >= 45) {
        connection.query(`SELECT M.imdb_id, title, year, genre, duration, language, R.males_45age_avg_vote as rating FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id ORDER BY rating DESC;`, 
        function (error, results, fields) {
            if (error) {
                res.json({results: ""})
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 8
// Add to watchlist table (needs more work)
// Route 8
// Add to watchlist table 
async function add_to_watchlist(req, res) {
	const movieID = req.query.id;
const movieTitle= req.query.title;
    connection.query(`INSERT INTO Watchlist (imdb_id, title)VALUES ('movieID', 'movieTitle');`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 9
// Display watchlist
async function watchlist(req, res) {
    connection.query(
	`SELECT M.imdb_id, title, year, genre, duration, language, director, Ratings.weighted_avg_vote
	FROM Watchlist 
	JOIN Movies M on Movies.imdb_id = Watchlist.imdb_id
	JOIN Ratings R ON M.imdb_id = R.imdb_id
	ORDER BY Movies.date_published DESC
	LIMIT 20;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 10
// Display watchlist
async function recommendation(req, res) {
    connection.query(
	`SELECT M.imdb_id, title, year, genre, duration, language, Ratings.weighted_avg_vote
	FROM Movies 
	FROM Movies M JOIN Ratings R ON M.imdb_id = R.imdb_id 
	WHERE Movies.director IN (
		SELECT Movies.director 
		FROM Watchlist
		JOIN Movies M on Movies.imdb_id = Watchlist.imdb_id)
	ORDER BY R.rating DESC 
	LIMIT 20;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 11
// Return all movies
async function all_movies(req, res) {
    connection.query(
	`SELECT Movies.title
	FROM Movies
	ORDER BY Movies.title ASC;`, 
    function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({results: ""})
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    generic_movie_search,
	top_movie_by_year,
	top_movie_by_genre,
	top_movie_by_director,
	movie_id,
	new_top_rated,
	top_rated_by_demographics,
	add_to_watchlist,
	watchlist,
	recommendation,
	all_movies
}