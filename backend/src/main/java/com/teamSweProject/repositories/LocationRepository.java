package com.teamSweProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByLocationName(String locationName);
}
