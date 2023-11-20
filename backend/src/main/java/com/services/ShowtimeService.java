package com.services;

import com.entities.Movie;
import com.entities.Showtime;
import com.repositories.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieService movieService;

    @Autowired
    public ShowtimeService(ShowtimeRepository showtimeRepository, MovieService movieService) {
        this.showtimeRepository = showtimeRepository;
        this.movieService = movieService;
    }

    public List<Showtime> getShowtimesByMovieId(Long movieId) {
        return showtimeRepository.findByMovieMovieId(movieId);
    }

    public Showtime createShowtime(Long movieId, LocalDate date, LocalTime startTime) {
        Movie movie = movieService.getMovieById(movieId);
        if (movie == null) {
            // Handle movie not found
            return null;
        }

        Showtime showTime = new Showtime(startTime, date, movie);
        return showtimeRepository.save(showTime);
    }

    // Other methods...
}
