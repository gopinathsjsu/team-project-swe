package com.repositories;

import com.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Ticket;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUser(Users user);
}
