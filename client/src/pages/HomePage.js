import React, {useState, useEffect} from 'react';
import { Form, FormSelect, FormGroup, Button, Card, CardBody, CardTitle, CardSubtitle, CardImg, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Row,
  Col,
  Divider,
  Select,
} from 'antd'

import MenuBar from '../components/MenuBar';
import App from '../components/App.css';
import {getAllMovies, getMovie, getGenre, getDirector } from '../fetcher'
import background from "../movieReel.jpg";
import SearchBar from "../components/SearchBar";

const { Column, ColumnGroup } = Table;
const { Option } = Select;


const movieColumns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),

  },
  {
    title: 'director',
    dataIndex: 'director',
    key: 'director',
    sorter: (a, b) => a.director.localeCompare(b.director),

  },

  {
    title: 'year',
    dataIndex: 'year',
    key: 'year',
    sorter: (a, b) => a.year < (b.year),
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
    sorter: (a, b) => a.duration < (b.duration),

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
    sorter: (a, b) => a.rating > (b.rating),
  }

];



class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesResults: [],
      genreResults: [],
      genre: "",
      director : "",
      directorResults :[],
      moviesRandom: [],
      moviesSize: 40000,
      moviesPageNumber: 1,
      moviesPageSize: 10,
      pagination: null ,
      selectedMovieId:window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
      selectedMovieDetails: null
    }

   
    this.goToMovie = this.goToMovie.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.randomize = this.randomize.bind(this)
    this.handleDirectorChange = this.handleDirectorChange.bind(this)
    this.updateDirectorResults = this.updateDirectorResults.bind(this)
  }

  goToMovie(MovieId) {
    window.location = `/movies?id=${MovieId}`
  }

  randomize() {
    getAllMovies().then(res => {
      var randomNum = Math.floor(Math.random() * 40)
        this.setState({ moviesRandom: [res.results[randomNum]] })
    })
}
    
/*function radnomizer(props){
  const [random, setRandom] = this.setState(this.state.value);
  getAllMovies(null, null).then(props => {
    this.setState({ moviesResults: props.results })
    var random = Math.floor(Math.random() * 40)
  
  })
}   */       


  handleGenreChange(event) {
    this.setState({ genre: event.target.value })
}

  updateSearchResults() {
    getGenre(this.state.genre).then(res => {
        this.setState({ genreResults: res.results })
    })
}

handleDirectorChange(event) {
  this.setState({ director: event.target.value })
}

updateDirectorResults(event) {
  getDirector(this.state.director).then(res => {
      this.setState({ directorResults: res.results })
  })
  event.preventDefault();
}

  componentDidMount() {
    getAllMovies(null, null).then(res => {
      this.setState({ moviesResults: res.results })
    })

    getMovie(this.state.selectedMovieId).then(res => { 
      this.setState({ selectedMovieDetails: res.results[0] })
  })

    getGenre('Adventure').then(res => {
      console.log(res.results)
      this.setState({ genreResults: res.results })
  })

  getDirector('Tarantino').then(res => {
    console.log(res.results)
    this.setState({ directorResults: res.results })
})

  getAllMovies(this.state.selectedMovieId).then(res => { 
    this.setState({ moviesRandom: res.results })
})
    
  }


  render() {
    return (
      <div>
        <MenuBar />

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', textAlign: 'center' }}>
          <h1>WELCOME TO CELEBRATING CINEMA!!!</h1>
          <h5>Enjoy randomly selecting a movie or having a recommendation provided to you by our amazing team</h5>
          <h5>Movies to start you off on your cinematic journey</h5>
    <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMovie(record.imdb_id)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>

                  <Column title="Movies" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>

          </Table>
         {/*} <Table dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/></Table> */}
          
        </div>


        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', textAlign: 'center'}}>
        <h5>In the mood for something?</h5>
          <h5>Search by Genre!</h5>
                    <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '30vw', margin: '0 auto' }}>
                            
                            <FormSelect value={this.state.genre} onChange={this.handleGenreChange}  >  
                              <option value="Adventure">Adventure</option>
                              <option value="Animation">Animation</option>
                              <option value="Biography">Biography</option>
                              <option value="Comedy">Comedy</option>
                              <option value="Crime">Crime</option>
                              <option value="Drama">Drama</option>
                              <option value="Family">Family</option>
                              <option value="Fantasy">Fantasy</option>
                              <option value="History">History</option>
                              <option value="Horror">Horror</option>
                              <option value="Musical">Musical</option>
                              <option value="Romance">Romance</option>            
                              <option value="Sci-Fi">Sci-Fi</option>           
                              <option value="Thriller">Thriller</option>
                            </FormSelect>
                        </FormGroup></Col>
                       
                        <Col flex={2}><FormGroup style={{ width: '10vw'}}>
                            <Button style={{ margin: '0 auto'  }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
              
                    <Table onRow={(record, rowIndex) => {
            return {
            onClick: event => {this.goToMovie(record.imdb_id)}, 
            };
        }} dataSource={this.state.genreResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}/>
                </div>
    
       {/*  <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh',textAlign: 'center' }}>
         <button onClick={this.randomize()}>Randomly Pick a Movie For Me</button>;
         
                    
          <Table dataSource={this.state.moviesRandom} columns={movieColumns} pagination={{ pageSizeOptions:[1], defaultPageSize: 1, showQuickJumper:false }}/>
          

        </div>*/}



        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh',textAlign: 'center' }}>
        <h5>Do you have a favorite Director? </h5>
        <h5>See what other Movies they have avavilable!</h5>
        <form onSubmit = {this.updateDirectorResults}>
          <label>
         <input placeholder='Search Directors' value = {this.state.director} onChange={this.handleDirectorChange} />
         </label>
         <input type="submit" value ="Submit" />
         </form>
          <Table onRow={(record, rowIndex) => {
          return {
            onClick: event => {this.goToMovie(record.name)}, 
            };
        }} dataSource={this.state.directorResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>

      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh',textAlign: 'center' }}>
      </div>


        <div style={{width: '100vw', marginTop: '6vh', backgroundRepeat: "no-repeat", backgroundSize: '100% 200%', textAlign: 'center', margin: '0 auto', flex: '1', justifyContent: 'center', alignItems: 'center', paddingTop: '50',  backgroundImage: `url(${background})` }}>
        <h12>Enjoy the entertainment</h12>
       </div>


      </div>
    )
  }

}

export default HomePage
