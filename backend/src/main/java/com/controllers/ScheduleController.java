package com.controllers;

import com.entities.Movie;
import com.entities.Schedule;
import com.services.MovieService;
import com.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final MovieService movieService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, MovieService movieService) {
        this.scheduleService = scheduleService;
        this.movieService = movieService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Optional<Schedule> schedule = scheduleService.getScheduleById(id);
        return schedule.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/multiplex/{multiplexId}")
    public ResponseEntity<List<Schedule>> getSchedulesByMultiplexId(@PathVariable Long multiplexId) {
        List<Schedule> schedules = scheduleService.getSchedulesByMultiplexId(multiplexId);
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        Schedule createdSchedule = scheduleService.saveSchedule(schedule);
        return new ResponseEntity<>(createdSchedule, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule updatedSchedule) {
        Optional<Schedule> existingSchedule = scheduleService.getScheduleById(id);
        if (existingSchedule.isPresent()) {
            // Update the fields of the existing schedule with the data from updatedSchedule
            Schedule scheduleToUpdate = existingSchedule.get();
            scheduleToUpdate.setMultiplex(updatedSchedule.getMultiplex());
            scheduleToUpdate.setMovies(updatedSchedule.getMovies());

            // Save the updated schedule
            Schedule savedSchedule = scheduleService.saveSchedule(scheduleToUpdate);
            return new ResponseEntity<>(savedSchedule, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/addMovies")
    public ResponseEntity<Schedule> addMoviesToSchedule(@PathVariable Long id, @RequestBody List<Long> movieIds) {
        Optional<Schedule> existingSchedule = scheduleService.getScheduleById(id);

        if (existingSchedule.isPresent()) {
            Schedule scheduleToUpdate = existingSchedule.get();

            List<Movie> moviesToAdd = movieService.getMoviesByIds(movieIds);

            scheduleToUpdate.getMovies().addAll(moviesToAdd);

            Schedule savedSchedule = scheduleService.saveSchedule(scheduleToUpdate);

            return new ResponseEntity<>(savedSchedule, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{scheduleId}/movies/{movieId}")
    public ResponseEntity<Void> deleteMovieFromSchedule(
            @PathVariable Long scheduleId,
            @PathVariable Long movieId) {

        Optional<Schedule> optionalSchedule = scheduleService.getScheduleById(scheduleId);
        Optional<Movie> optionalMovie = Optional.ofNullable(movieService.getMovieById(movieId));

        if (optionalSchedule.isPresent() && optionalMovie.isPresent()) {
            Schedule schedule = optionalSchedule.get();
            Movie movieToRemove = optionalMovie.get();

            schedule.getMovies().remove(movieToRemove);
            scheduleService.saveSchedule(schedule);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
