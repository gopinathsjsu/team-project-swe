package com.teamSweProject.controllers;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Showtime;
import com.teamSweProject.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getMovieById")
    public ResponseEntity<Movie> getMovieById(@RequestParam Long movieId) {
        Movie movie = movieService.getMovieById(movieId);
        if (movie != null) {
            return ResponseEntity.ok(movie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getAllMovies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }


    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getAllMovieIds")
    public ResponseEntity<List<Long>> getAllMovieIds() {
        List<Long> movieIds = movieService.getAllMovieIds();
        return ResponseEntity.ok(movieIds);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/multiplex/{multiplexId}")
    public ResponseEntity<List<Movie>> getMoviesByMultiplexId(@PathVariable Long multiplexId) {
        List<Movie> movies = movieService.getMoviesByMultiplexId(multiplexId);
        if (movies == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(movies);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getShowTimes")
    public ResponseEntity<List<Showtime>> getShowTimesForMovie(@RequestParam Long movieId) {
        List<Showtime> showTimes = movieService.getShowtimesForMovie(movieId);
        if (showTimes == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(showTimes);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{movieId}/deleteShowTime")
    public ResponseEntity<String> deleteShowtime(@PathVariable Long movieId, @RequestParam Long showTimeId) {
        boolean success = movieService.deleteShowtime(movieId, showTimeId);
        if (success) {
            return ResponseEntity.ok("Showtime deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Showtime not found or could not be deleted.");
        }
    }


    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getNewReleases")
    public ResponseEntity<List<Movie>> getNewReleases() {
        List<Movie> newReleases = movieService.getNewReleases();
        return ResponseEntity.ok(newReleases);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getUpcomingMovies")
    public ResponseEntity<List<Movie>> getUpcomingMovies() {
        List<Movie> upcomingMovies = movieService.getUpcomingMovies();
        return ResponseEntity.ok(upcomingMovies);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {

        Movie createdMovie;

        createdMovie = movieService.createMovie(
                movie.getTitle(),
                movie.getRating(),
                movie.getReleaseDate(),
                movie.getGenre(),
                movie.getDuration(),
                movie.getDescription(),
                movie.getPoster()
        );

        if (createdMovie != null) {
            return ResponseEntity.ok(createdMovie);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie) {

        Movie updatedMovie;

        updatedMovie = movieService.updateMovie(
                movie.getMovieId(),
                movie.getTitle(),
                movie.getRating(),
                movie.getReleaseDate(),
                movie.getGenre(),
                movie.getDuration(),
                movie.getDescription(),
                movie.getPoster()
        );

        if (updatedMovie != null) {
            return ResponseEntity.ok(updatedMovie);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMovie(@RequestParam Long movieId) {

        boolean success = movieService.deleteMovie(movieId);

        if (success) {
            return ResponseEntity.ok("Movie deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Movie not found or could not be deleted.");
        }

    }

}
