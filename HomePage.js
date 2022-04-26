import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import {getAllMovies,getAllPosters, getMovie, getTitle, getGenre } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const movieColumns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.Title.localeCompare(b.Title),

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



class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      moviessResults: [],
      moviesPageNumber: 1,
      moviesPageSize: 10,
      postersResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMovie = this.goToMovie.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.randomMovie = this.randomMovie.bind(this)
  }

  
  randomMovie() {
    getAllMovies(null, null, '').then(res => {
      this.setState({ moviesResults: res.results })
      
    {/*var randomize = randomMovie[Math.floor(Math.random() * randomMovie.length)]; */}

    })
  }

    

  goToMovie(movieId) {
    window.location = `/movie?id=${movieId}`
  }

  handleGenreChange(event) {
    this.setState({ genre: event.target.value })
}

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMovies in fetcher.js with the parameters page and pageSize set to null
    // then, moviesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getAllMovies(null, null, value).then(res => {
      this.setState({ moviesResults: res.results })
    })
  }

  updateGenreResults() {
    getGenre(this.state.genre).then(res => {
        this.setState({ moviesResults: res.results })
    })
}
  componentDidMount() {
    getAllMovies(null, null, 'D1').then(res => {
      this.setState({ moviesResults: res.results })
    })

    getAllPosters().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({postersResults : res.results
      });
    })

  }



  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h1>WELCOME TO CELEBRATING CINEMA!!!</h1>
          <h5>Enjoy randomly selecting a movie or having a recommendation provided to you by our amazing team</h5>
          <h5>Movies to start you off on your cinematic journey</h5>
        
         {/*<button onClick={randomize}>Default</button>;*/}

          <Table dataSource={this.state.moviesResults} columns={movieColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>


        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h5>What type of movie are you in the mood for? We have them all! </h5>
          <Select defaultValue="Adventure" style={{ width: 120 }} onChange={this.leagueOnChange}>
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
      onClick: event => {this.getGenre(record.MovieId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.moviesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Movies">
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Movies" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
             {/* <Column title="Movies" dataIndex="Movie" key="Movie" sorter= {(a, b) => a.Movie.localeCompare(b.Movie)}/>*/}
            
            </ColumnGroup>


          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage
