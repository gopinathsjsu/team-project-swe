package com.services;

import com.entities.Movie;
import com.repositories.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.time.Instant;
import java.util.Calendar;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final static Logger logger = LoggerFactory.getLogger(MovieService.class);

    public MovieService(MovieRepository movieRepository) { this.movieRepository = movieRepository; }

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
    public Movie createMovie(String title, float rating, Date releaseDate, Movie.Genre genre) {

        if (genre == null) {
            genre = Movie.Genre.OTHER;
        }
        Movie movie = new Movie(title, rating, releaseDate, genre);

        return movieRepository.save(movie);

    }

    // update Movie

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

    
}
