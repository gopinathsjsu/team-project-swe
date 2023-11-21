package com.services;

import com.entities.Movie;
import com.entities.Multiplex;
import com.entities.Showtime;
import com.entities.Theater;
import com.repositories.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public Showtime createShowtime(Long movieId, LocalDateTime startDateTime, Theater theater, Multiplex multiplex) {
        Movie movie = movieService.getMovieById(movieId);
        if (movie == null) {
            System.out.println("Movie does not exist, show time not created");
            return null;
        }

        Showtime showtime = new Showtime(
                startDateTime.toLocalTime(),
                startDateTime.toLocalDate(),
                movie,
                theater,
                multiplex
        );
        return showtimeRepository.save(showtime);
    }

}
