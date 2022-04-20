import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviessPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MoviesPage from './pages/MoviesPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/movies"
							render={() => (
								<MoviessPage />
							)}/>
        <Route exact
							path="/posters"
							render={() => (
								<PostersPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

