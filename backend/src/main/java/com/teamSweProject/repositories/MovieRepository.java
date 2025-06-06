package com.teamSweProject.repositories;

import com.teamSweProject.entities.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT s FROM showtime s WHERE s.movie.movieId = :movieId")
    List<Showtime> findShowtimesByMovieId(@Param("movieId") Long movieId);

    @Query("SELECT m FROM movie m INNER JOIN m.showtimes s INNER JOIN s.theater t " +
            "WHERE t.multiplex.multiplexId = :multiplexId")
    List<Movie> findByMultiplexId(@Param("multiplexId") Long multiplexId);

    Optional<Movie> findByTitle(String title);

}

