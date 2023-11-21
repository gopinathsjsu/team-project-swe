package com.repositories;

import com.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Showtime;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByMovieMovieId(Long movieId);

}
