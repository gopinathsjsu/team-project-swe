package com.services;

import com.entities.Movie;
import com.entities.Showtime;
import com.repositories.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.time.Instant;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final static Logger logger = LoggerFactory.getLogger(MovieService.class);

    public MovieService(MovieRepository movieRepository) { this.movieRepository = movieRepository; }


    // get all Movie ids
    public List<Long> getAllMovieIds() {
        List<Movie> allMovies = movieRepository.findAll();

        List<Long> ids = new ArrayList<>();

        for (Movie movie: allMovies) {
            ids.add(movie.getMovieId());
        }
        // Set duration and genre information for each movie if needed
        return ids;
    }

    // get movie by id
    public Movie getMovieById(Long movieId) {

        return movieRepository.findById(movieId).orElse(null);
    }

    // get Showtimes given Movie id
    public List<Showtime> getShowtimesForMovie(Long movieId) {
        return movieRepository.findShowtimesByMovieId(movieId);
    }


    // get Upcoming Movies
    public List<Movie> getUpcomingMovies() {
        List<Movie> allMovies = movieRepository.findAll();

        return allMovies.stream()
                .filter((movie) -> movie.getReleaseDate().after(Date.from(Instant.now())))
                .toList();
    }

    // get New Releases
    public List<Movie> getNewReleases() {
        List<Movie> allMovies = movieRepository.findAll();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);

        Date startDate = calendar.getTime();
        Date endDate = Date.from(Instant.now());

        return allMovies.stream()
                .filter((movie) -> (movie.getReleaseDate().after(startDate) && movie.getReleaseDate().before(endDate)))
                .toList();
    }

    // create Movie
    public Movie createMovie(String title, float rating, Date releaseDate, Movie.Genre genre, String duration, String description) {

        if (genre == null) {
            genre = Movie.Genre.OTHER;
        }
        Movie movie = new Movie(title, rating, releaseDate, genre, duration, description);

        return movieRepository.save(movie);

    }

    // delete Movie
    public boolean deleteMovie(Long id) {
        try {
            movieRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            logger.error("Failed to delete movie", e);
            return false;
        }
    }

    public List<Movie> getMoviesByIds(List<Long> movieIds) {
        return movieRepository.findAllById(movieIds);
    }
}
