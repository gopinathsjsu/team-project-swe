package com.teamSweProject.services;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Multiplex;
import com.teamSweProject.entities.Showtime;
import com.teamSweProject.entities.Theater;
import com.teamSweProject.repositories.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public Showtime updateShowtime(Long showtimeId, LocalDateTime startDateTime) {
        Showtime showtime = showtimeRepository.findById(showtimeId).orElse(null);
        if (showtime == null) {
            System.out.println("Showtime does not exist, show time not updated");
            return null;
        }

        showtime.setTime(startDateTime.toLocalTime());
        showtime.setDate(startDateTime.toLocalDate());
        return showtimeRepository.save(showtime);
    }

    public void deleteShowtime(Long showtimeId) {
        movieService.getShowtimesForMovie(showtimeId).removeIf(showtime -> showtime.getShowtimeId().equals(showtimeId));
        showtimeRepository.deleteById(showtimeId);
    }

}
