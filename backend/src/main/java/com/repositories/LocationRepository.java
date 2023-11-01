package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
