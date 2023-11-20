package com.controllers;

import com.entities.Showtime;
import com.services.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @Autowired
    public ShowtimeController(ShowtimeService showTimeService) {
        this.showtimeService = showTimeService;
    }

    @GetMapping("/getByMovie")
    public ResponseEntity<List<Showtime>> getShowTimesByMovie(@RequestParam Long movieId) {
        List<Showtime> showTimes = showtimeService.getShowtimesByMovieId(movieId);
        return ResponseEntity.ok(showTimes);
    }

    @PostMapping("/create")
    public ResponseEntity<Showtime> createShowtime(@RequestParam Long movieId, @RequestParam String startTime,
                                                   @RequestParam CharSequence movieDate) {
        LocalTime start = LocalTime.parse(startTime);
        LocalDate date = LocalDate.parse(movieDate);
        Showtime createdShowTime = showtimeService.createShowtime(movieId, date, start);

        if (createdShowTime != null) {
            return ResponseEntity.ok(createdShowTime);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // add api endpoints...
}
