package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Multiplex;

import java.util.List;

public interface MultiplexRepository extends JpaRepository<Multiplex, Long> {

    List<Multiplex> findByLocationLocationId(Long locationId);

}
