import React from 'react';
import MenuBar from '../components/MenuBar';

export default class RecommendationsPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			recommendationList: []
		}

		this.handleClickButton = this.handleClickButton.bind(this);
	}

	handleClickButton(event){
		getRecommenations().then(res => {
			this.setState({recommendationList: res.results})
		})
	}

	render(){
		return(
			<div>
				<MenuBar/>
				<button onClick = {this.handleClickButton}>Show Recommendations</button>
				<ul>
					{this.state.recommendationList}
				</ul>
			</div>
		)
	}
}
