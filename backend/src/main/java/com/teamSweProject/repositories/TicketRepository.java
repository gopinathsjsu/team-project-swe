package com.teamSweProject.repositories;

import com.teamSweProject.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamSweProject.entities.Ticket;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUser(Users user);
    List<Ticket> findByUserAndBookingDateAfter(Users user, LocalDateTime startDate);

    int countByTheaterAssignmentTheaterIdAndStatus(Long theaterId, Ticket.TicketStatus status);
    int countByTheaterAssignmentTheaterIdAndBookingDateAfter(Long theaterId, LocalDateTime startDate);
    int countByAssignedMovieMovieIdAndBookingDateAfterAndStatus(Long movieId, LocalDateTime startDate, Ticket.TicketStatus status);


}
