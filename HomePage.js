import React from 'react';
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
import {getAllMovies, getMovie, getTitle, getGenre } from '../fetcher'
import background from "../movieReel.jpg";

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
      moviessResults: [],
      genreResults: [],
      genre: "",
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
  }

  goToMovie(MovieId) {
    window.location = `/movie?id=${MovieId}`
  }

  randomize() {
    getAllMovies().then(res => {
        this.setState({ moviesRandom: res.results })
    })
}
    

  handleGenreChange(event) {
    this.setState({ genre: event.target.value })
}

  updateSearchResults() {
    getGenre(this.state.genre).then(res => {
        this.setState({ genreResults: res.results })
    })
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

  getMovie(this.state.selectedMovieId).then(res => { 
    this.setState({ moviesRandom: res.results[0] })
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
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <h3>Genre</h3>
                    <Table onRow={(record, rowIndex) => {
            return {
            onClick: event => {this.goToMovie(record.imdb_id)}, 
            };
        }} dataSource={this.state.genreResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10, 20], defaultPageSize: 5, showQuickJumper:true }}/>
                </div>


        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h1>WELCOME TO CELEBRATING CINEMA!!!</h1>
          <h5>Enjoy randomly selecting a movie or having a recommendation provided to you by our amazing team</h5>
          <h5>Movies to start you off on your cinematic journey</h5>
    <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMovie(record.movieId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                  {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
                  <Column title="Movies" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
             {/* <Column title="Movies" dataIndex="Movie" key="Movie" sorter= {(a, b) => a.Movie.localeCompare(b.Movie)}/>*/}
            
       


          </Table>
         {/*} <Table dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/></Table> */}
          
        </div>

    
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh',textAlign: 'center' }}>
          <button onClick={this.randomize(getAllMovies[Math.floor(Math.random() * getAllMovies.length)])}>Randomly Pick a Movie For Me</button>;
         
                    
          <Table dataSource={this.state.moviesRandom} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          

        </div>


        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh',textAlign: 'center' }}>
          <h5>What type of movie are you in the mood for? We have them all! </h5>
          <Select defaultValue="Adventure" style={{ width: 120 }} onChange={this.handleGenreChange}>
             {/* TASK 3: Take a look at Dataset Information.md from MS1 and options to the selector*/}
             <Option value="Adventure">Adventure</Option>
             <Option value="Animation">Animation</Option>
             <Option value="Biography">Biography</Option>
             <Option value="Comedy">Comedy</Option>
             <Option value="Crime">Crime</Option>
             <Option value="Drama">Drama</Option>
             <Option value="Family">Family</Option>
             <Option value="Fantasy">Fantasy</Option>
             <Option value="History">History</Option>
             <Option value="Horror">Horror</Option>
             <Option value="Musical">Musical</Option>
             <Option value="Romance">Romance</Option>            
             <Option value="Sci-Fi">Sci-Fi</Option>           
             <Option value="Thriller">Thriller</Option>
            
          </Select>
         
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMovie(record.movieId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.genreResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
      
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Movies" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
             {/* <Column title="Movies" dataIndex="Movie" key="Movie" sorter= {(a, b) => a.Movie.localeCompare(b.Movie)}/>*/}
            

          </Table>

        </div>


        <div style={{width: '100vw', marginTop: '6vh', backgroundRepeat: "no-repeat", backgroundSize: '100% 200%', textAlign: 'center', margin: '0 auto', flex: '1', justifyContent: 'center', alignItems: 'center', paddingTop: '50',  backgroundImage: `url(${background})` }}>
        <h12>Enjoy the entertainment</h12>
       </div>

    

      </div>
    )
  }

}

export default HomePage


