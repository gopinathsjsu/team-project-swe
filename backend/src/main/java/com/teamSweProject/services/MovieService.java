package com.teamSweProject.services;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Showtime;
import com.teamSweProject.repositories.MovieRepository;
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

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // get movies playing at specific multiplex
    public List<Movie> getMoviesByMultiplexId(Long multiplexId) {
        return movieRepository.findByMultiplexId(multiplexId);
    }

    // get movie by id
    public Movie getMovieById(Long movieId) {

        return movieRepository.findById(movieId).orElse(null);
    }

    // get movie by title
    public Optional<Movie> findByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    // get Showtimes given Movie id
    public List<Showtime> getShowtimesForMovie(Long movieId) {
        return movieRepository.findShowtimesByMovieId(movieId);
    }

    public boolean deleteShowtime(Long movieId, Long showtimeId) {
        Movie movie = movieRepository.findById(movieId).orElse(null);
        if (movie == null) {
            logger.error("Failed to delete showtime, movie not found");
            return false;
        }

        List<Showtime> showtimes = movie.getShowtimes();
        for (Showtime showtime: showtimes) {
            if (showtime.getShowtimeId().equals(showtimeId)) {
                showtimes.remove(showtime);
                movie.setShowtimes(showtimes);
                movieRepository.save(movie);
                return true;
            }
        }
        logger.error("Failed to delete showtime, showtime not found");
        return false;
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
    public Movie createMovie(String title,
                             float rating,
                             Date releaseDate,
                             Movie.Genre genre,
                             String duration,
                             String description,
                             String poster) {

        if (genre == null) {
            genre = Movie.Genre.OTHER;
        }
        Movie movie = new Movie(title, rating, releaseDate, genre, duration, description, poster);

        return movieRepository.save(movie);

    }

    // update Movie
    public Movie updateMovie(Long id,
                             String title,
                             float rating,
                             Date releaseDate,
                             Movie.Genre genre,
                             String duration,
                             String description,
                             String poster) {

        Movie movie = movieRepository.findById(id).orElse(null);

        if (movie == null) {
            logger.error("Failed to update movie, movie not found");
            return null;
        }

        if (title != null) {
            movie.setTitle(title);
        }
        if (rating != 0) {
            movie.setRating(rating);
        }
        if (releaseDate != null) {
            movie.setReleaseDate(releaseDate);
        }
        if (genre != null) {
            movie.setGenre(genre);
        }
        if (duration != null) {
            movie.setDuration(duration);
        }
        if (description != null) {
            movie.setDescription(description);
        }
        if (poster != null) {
            movie.setPoster(poster);
        }

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
