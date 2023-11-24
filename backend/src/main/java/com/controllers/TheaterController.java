package com.controllers;

import com.entities.Movie;
import com.entities.Theater;
import com.services.TheaterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/api/theaters")
public class TheaterController {

    private final TheaterService theaterService;

    public TheaterController(TheaterService theaterService) {
        this.theaterService = theaterService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getTheaters")
    public ResponseEntity<List<Theater>> getAllTheaters() {
        try {
            List<Theater> theaters = theaterService.getAllTheaters();
            return ResponseEntity.ok(theaters);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/{theaterId}/getAssignedMovie")
    public ResponseEntity<Movie> getAssignedMovie(@PathVariable Long theaterId) {
        try {
            Movie movie = theaterService.findAssignedMovieIdByTheaterId(theaterId);
            return ResponseEntity.ok(movie);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{theaterId}/assignMovie/{movieId}")
    public ResponseEntity<String> assignMovieToTheater(@PathVariable Long theaterId, @PathVariable Long movieId) {
        try {
            Theater theater = theaterService.getTheaterById(theaterId);
            theaterService.assignMovieToTheater(theater, movieId);
            return ResponseEntity.ok("Movie assigned to theater");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
