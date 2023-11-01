package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
