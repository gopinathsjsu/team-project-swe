package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Theater;


public interface TheaterRepository extends JpaRepository<Theater, Long> {
}
