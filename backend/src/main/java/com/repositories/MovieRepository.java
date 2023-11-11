package com.repositories;

import com.entities.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT s FROM showtime s WHERE s.movie.movieId = :movieId")
    List<Showtime> findShowtimesByMovieId(@Param("movieId") Long movieId);

}

