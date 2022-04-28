import React from 'react';

	
const MovieList = (props) => {
	function goToMovie(MovieId){
		window.location = `/movies?id=${MovieId}`
	};

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.poster} onClick={() => goToMovie(movie.imdb_id)} />
						
				</div>
			))}
		</>
	);
};

export default MovieList;