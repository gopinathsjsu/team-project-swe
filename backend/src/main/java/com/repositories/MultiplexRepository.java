package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Multiplex;

public interface MultiplexRepository extends JpaRepository<Multiplex, Long> {
}
