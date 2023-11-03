package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
