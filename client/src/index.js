import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


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
								<MoviesPage />
							)}/>
        <Route exact
							path="/Recommendations"
							render={() => (
								<RecommendationsPage/>
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

