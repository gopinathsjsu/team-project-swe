package com.teamSweProject.controllers;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Schedule;
import com.teamSweProject.services.MovieService;
import com.teamSweProject.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final MovieService movieService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, MovieService movieService) {
        this.scheduleService = scheduleService;
        this.movieService = movieService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Optional<Schedule> schedule = scheduleService.getScheduleById(id);
        return schedule.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/multiplex/{multiplexId}")
    public ResponseEntity<List<Schedule>> getSchedulesByMultiplexId(@PathVariable Long multiplexId) {
        List<Schedule> schedules = scheduleService.getSchedulesByMultiplexId(multiplexId);
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        Schedule createdSchedule = scheduleService.saveSchedule(schedule);
        return new ResponseEntity<>(createdSchedule, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/addMovie/{movieId}")
    public ResponseEntity<Schedule> addMovieToSchedule(@PathVariable Long id, @PathVariable Long movieId) {
        Optional<Schedule> existingSchedule = scheduleService.getScheduleById(id);

        if (existingSchedule.isPresent()) {
            Schedule scheduleToUpdate = existingSchedule.get();

            Movie movieToAdd = movieService.getMovieById(movieId);

            scheduleToUpdate.getMovies().add(movieToAdd);

            Schedule savedSchedule = scheduleService.saveSchedule(scheduleToUpdate);

            return new ResponseEntity<>(savedSchedule, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasRole('ADMIN')")
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
