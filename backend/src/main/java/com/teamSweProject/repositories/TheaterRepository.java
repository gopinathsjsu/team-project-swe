package com.teamSweProject.repositories;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Multiplex;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Theater;

import java.util.List;
import java.util.Optional;


public interface TheaterRepository extends JpaRepository<Theater, Long> {
    List<Theater> findByMultiplex(Multiplex multiplex);
    Optional<Theater> findByName(String name);
    Theater findByAssignedMovieAndMultiplex(Movie movie, Multiplex multiplex);
}
