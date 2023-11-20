package com.controllers;

import com.entities.Movie;
import com.entities.Showtime;
import com.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    @GetMapping("/getAllMovieIds")
    public ResponseEntity<List<Long>> getAllMovieIds() {
        List<Long> movieIds = movieService.getAllMovieIds();
        return ResponseEntity.ok(movieIds);
    }

    @GetMapping("/getShowTimes")
    public ResponseEntity<List<Showtime>> getShowTimesForMovie(@RequestParam Long movieId) {
        List<Showtime> showTimes = movieService.getShowtimesForMovie(movieId);
        return ResponseEntity.ok(showTimes);
    }
    @GetMapping("/getNewReleases")
    public ResponseEntity<List<Movie>> getNewReleases() {
        List<Movie> newReleases = movieService.getNewReleases();
        return ResponseEntity.ok(newReleases);
    }

    @GetMapping("/getUpcomingMovies")
    public ResponseEntity<List<Movie>> getUpcomingMovies() {
        List<Movie> upcomingMovies = movieService.getUpcomingMovies();
        return ResponseEntity.ok(upcomingMovies);
    }

    @PostMapping("/create")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {

        Movie createdMovie;

        createdMovie = movieService.createMovie(
                movie.getTitle(),
                movie.getRating(),
                movie.getReleaseDate(),
                movie.getGenre(),
                movie.getDuration(),
                movie.getDescription()
        );

        if (createdMovie != null) {
            return ResponseEntity.ok(createdMovie);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

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
