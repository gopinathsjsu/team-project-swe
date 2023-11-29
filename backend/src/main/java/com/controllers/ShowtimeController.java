package com.controllers;

import com.entities.Showtime;
import com.repositories.MultiplexRepository;
import com.repositories.TheaterRepository;
import com.services.ShowtimeService;
import com.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    private final ShowtimeService showtimeService;
    private final MovieService movieService;
    private final TheaterRepository theaterRepository;
    private final MultiplexRepository multiplexRepository;

    @Autowired
    public ShowtimeController(
            ShowtimeService showTimeService,
            MovieService movieService,
            TheaterRepository theaterRepository,
            MultiplexRepository multiplexRepository
    ) {
        this.showtimeService = showTimeService;
        this.movieService = movieService;
        this.theaterRepository = theaterRepository;
        this.multiplexRepository = multiplexRepository;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getByMovie")
    public ResponseEntity<List<Showtime>> getShowTimesByMovie(@RequestParam Long movieId) {
        List<Showtime> showTimes = showtimeService.getShowtimesByMovieId(movieId);
        return ResponseEntity.ok(showTimes);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Showtime> createShowtime(
            @RequestParam Long movieId,
            @RequestParam LocalDateTime showDateTime,
            @RequestParam Long theaterId,
            @RequestParam Long multiplexId
    ) {

        if (movieService.getMovieById(movieId) == null ||
                theaterRepository.findById(theaterId).isEmpty() ||
                multiplexRepository.findById(multiplexId).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Create Showtime
        Showtime createdShowTime = showtimeService.createShowtime(
                movieId,
                showDateTime,
                theaterRepository.findById(theaterId).get(),
                multiplexRepository.findById(multiplexId).get()
        );

        if (createdShowTime != null) {
            return ResponseEntity.ok(createdShowTime);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    ResponseEntity<Showtime> updateShowtime(@RequestParam Long movieId, @RequestParam LocalDateTime showDateTime, @RequestParam Long theaterId, @RequestParam Long multiplexId) {
        Showtime updatedShowtime = showtimeService.updateShowtime(movieId, showDateTime, theaterRepository.findById(theaterId).get(), multiplexRepository.findById(multiplexId).get());
        if (updatedShowtime != null) {
            return ResponseEntity.ok(updatedShowtime);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // this method also disassociates the showtime from the movie
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    ResponseEntity<Void> deleteShowtime(@RequestParam Long showtimeId) {
        showtimeService.deleteShowtime(showtimeId);
        return ResponseEntity.noContent().build();
    }

    // add api endpoints...
}
