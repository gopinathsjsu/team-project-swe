import axios from 'axios';
import authHeader from './auth/auth-header';

const MOVIES_BASE_URL = 'http://localhost:8080/api/movies';
const genreConversions = {
  'Action': 'ACTION',
  'Adventure': 'ADVENTURE',
  'Comedy': 'COMEDY',
  'Drama': 'DRAMA',
  'Horror': 'HORROR',
  'Romance': 'ROMANCE',
  'Science Fiction': 'SCIENCE_FICTION',
  'Fantasy': 'FANTASY',
  'Historical': 'HISTORICAL',
  'Crime': 'CRIME',
  'Mystery': 'MYSTERY',
  'Other': 'OTHER'
};

class MoviesService {

  async createMovie(newMovie) { // TODO: add auth header
    // const { title, description, releaseDate, duration, rating, genre } = newMovie;
    return await axios.post(MOVIES_BASE_URL + '/create', 
      {
        title: newMovie.title,
        description: newMovie.description,
        duration: newMovie.duration,
        rating: newMovie.rating,
        releaseDate: newMovie.releaseDate,
        genre: genreConversions[newMovie.genre],
        posterUrl: ''
      }
    );
  }

  async updateMovie(updatedMovie) { // TODO: add auth header
    const {movieId, title, description, duration, rating, genre} = updatedMovie;

    // get the fields that are not updated in the editMovieForm
    const originalMovie = await axios.get(`${MOVIES_BASE_URL}/getMovieById`, {
      params: {
        movieId: movieId
      }
    });
    const {releaseDate, poster, showtimes} = originalMovie;
    return await axios.put(MOVIES_BASE_URL + '/update', {
      movieId: movieId,
      title: title,
      rating: rating,
      releaseDate: releaseDate,
      duration: duration,
      description: description,
      poster: poster,
      showtimes: showtimes,
      genre: genre 
      }
    );
  }

  async fetchShowtimesByMovieId(movieId) {
    try {
      const response = await axios.get(`${MOVIES_BASE_URL}/getShowTimes?movieId=${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      return [];
    }
  };

  async fetchAllMovies() {
    try {
      const res = await axios.get(`${MOVIES_BASE_URL}/getAllMovies`);
      return res.data;
    } catch (e) {
      console.log('Error fetching all movies', e);
      return [];
    }
  }

}



export default new MoviesService();
