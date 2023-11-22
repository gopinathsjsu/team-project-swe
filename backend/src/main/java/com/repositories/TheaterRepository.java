package com.repositories;

import com.entities.Movie;
import com.entities.Multiplex;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Theater;

import java.util.List;
import java.util.Optional;


public interface TheaterRepository extends JpaRepository<Theater, Long> {
    List<Theater> findByMultiplex(Multiplex multiplex);
    Optional<Theater> findByName(String name);
    Movie findAssignedMovieIdByTheaterId(Long theaterId);
}
