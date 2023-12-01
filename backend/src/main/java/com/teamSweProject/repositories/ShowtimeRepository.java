package com.teamSweProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Showtime;

import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByMovieMovieId(Long movieId);

}
