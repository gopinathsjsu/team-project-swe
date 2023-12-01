package com.teamSweProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Multiplex;

import java.util.List;
import java.util.Optional;

public interface MultiplexRepository extends JpaRepository<Multiplex, Long> {

    List<Multiplex> findByLocationLocationId(Long locationId);
    Optional<Multiplex> findByName(String name);

}
