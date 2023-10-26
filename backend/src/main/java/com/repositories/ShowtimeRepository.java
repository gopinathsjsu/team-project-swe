package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
}
