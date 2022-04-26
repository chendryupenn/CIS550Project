import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import config from './config.json';
import MenuBar from './components/MenuBar.js';
const RecommendationsPage = () => {
	const [movies, setMovies] = useState([]);

	const getMovieRequest = async () => {
		const url = `http://${config.server_host}:${config.server_port}/recommendation`;

		const response = await fetch(url);
		const responseJson = await response.json();
		
		
		setMovies(responseJson.results);
		
	};
	//const responseJson = getRecommendation();
	//setMovies(responseJson.results);

	useEffect(() => {
		getMovieRequest();
	}, []);

	
	
	return (
		<div>
			
				<MenuBar />
				<div className='container-fluid movie-app'>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Recommendations' />
				</div>
				<div className='row'>
					<MovieList movies={movies} />
				</div>
				</div>
		</div>
		
	);
};

export default RecommendationsPage;

