package com.teamSweProject.repositories;

import com.teamSweProject.dataTransferObjects.MultiplexResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Multiplex;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MultiplexRepository extends JpaRepository<Multiplex, Long> {

    List<Multiplex> findByLocationLocationId(Long locationId);
    Optional<Multiplex> findByName(String name);

    @Query("SELECT new com.teamSweProject.dataTransferObjects.MultiplexResponseDTO(m.multiplexId, m.name) FROM multiplex m WHERE m.location.locationId = :locationId")
    List<MultiplexResponseDTO> getMultiplexesByLocationLocationId(@Param("locationId") Long locationId);
}
