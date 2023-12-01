package com.teamSweProject.repositories;

import com.teamSweProject.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Ticket;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUser(Users user);
}
