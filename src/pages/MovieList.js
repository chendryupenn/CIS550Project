import React from 'react';

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.poster} alt='movie'></img>
					{/*<div
						onClick={() => props.goToMovie(movie.imdb_id)}
						className='overlay d-flex align-items-center justify-content-center'
					>

			</div> */}
				</div>
			))}
		</>
	);
};

export default MovieList;