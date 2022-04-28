import React from 'react';
import { Form, FormSelect, FormGroup, Button, Card, CardBody, CardTitle, CardSubtitle, CardImg, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import {getTopRated, getMovie, addToWatchlist} from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

const movieColumns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'genre',
      dataIndex: 'genre',
      key: 'genre', 
    },
    {
      title: 'duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'rating',
      dataIndex: 'rating',
      key: 'rating', 
    }
  ];

class MoviePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: "",
            age: "",
            moviesResults: [],
            watchList: [],
            selectedMovieId:window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMovieDetails: null

        }

        this.handleGenderChange = this.handleGenderChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToMovie = this.goToMovie.bind(this)
        this.updateWatchlist = this.updateWatchlist.bind(this)

    }

    goToMovie(MovieId) {
        window.location = `/movies?id=${MovieId}`
    }

    handleGenderChange(event) {
        this.setState({ gender: event.target.value })
    }

    handleAgeChange(event) {
        this.setState({ age: event.target.value })
    }

    updateSearchResults() {
        getTopRated(this.state.gender, this.state.age).then(res => {
            this.setState({ moviesResults: res.results })
        })
    }

    updateWatchlist(MovieId, MovieTitle, Director) {
        addToWatchlist(MovieId, MovieTitle, Director)
    }

    componentDidMount() {
        getMovie(this.state.selectedMovieId).then(res => { 
            this.setState({ selectedMovieDetails: res.results[0] })
        })

        getTopRated('NA','0').then(res => {
            console.log(res.results)
            this.setState({ moviesResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Gender</label>
                            <FormSelect value={this.state.gender} onChange={this.handleGenderChange}  >  
                                <option value="NA">Default</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </FormSelect>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Age</label>
                            <FormSelect value={this.state.age} onChange={this.handleAgeChange}>  
                                <option value="0">Default</option>
                                <option value="1">under 18</option>
                                <option value="18">18 to 30</option>
                                <option value="30" >30 to 45</option>
                                <option value="45" >over 45</option>
                            </FormSelect>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw'}}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <h3>Top Rated</h3>
                    <Table onRow={(record, rowIndex) => {
            return {
            onClick: event => {this.goToMovie(record.imdb_id)}, 
            };
        }} dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                </div>

                {this.state.selectedMovieDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.state.selectedMovieDetails.title}</CardTitle>
                            <CardSubtitle>{this.state.selectedMovieDetails.year} {this.state.selectedMovieDetails.duration}min {this.state.selectedMovieDetails.country}</CardSubtitle>

                                <div className='image-container d-flex justify-content-start m-3'>
                                    <img src={this.state.selectedMovieDetails.poster} alt={null} style={{height:'19vh'}}></img>
                                </div>
      
                            Rating: <Progress style={{ width: '20vw'}} value={this.state.selectedMovieDetails.rating*10} >{this.state.selectedMovieDetails.rating}</Progress>
                            Language: <h6>{this.state.selectedMovieDetails.language}</h6> 
                            Genre: <h6>{this.state.selectedMovieDetails.genre}</h6> 
                            Director: <h6>{this.state.selectedMovieDetails.director}</h6> 
                            Actors: <h6>{this.state.selectedMovieDetails.actors}</h6> 
                            Description: <h6>{this.state.selectedMovieDetails.description}</h6> 
          
                            <Button pill theme="danger" onClick={() => this.updateWatchlist(this.state.selectedMovieDetails.imdb_id, this.state.selectedMovieDetails.title, this.state.selectedMovieDetails.director)}> Like it!</Button> 
                        </CardBody>

                    </Card>                   
                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default MoviePage
