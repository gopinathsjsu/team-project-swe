package com.teamSweProject.controllers;

import com.teamSweProject.dataTransferObjects.TicketDto;
import com.teamSweProject.entities.Ticket;
import com.teamSweProject.repositories.TicketRepository;
import com.teamSweProject.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;
    private final TicketRepository ticketRepository;

    @Autowired
    public TicketController(TicketService ticketService, TicketRepository ticketRepository) {
        this.ticketService = ticketService;
        this.ticketRepository = ticketRepository;
    }

    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getTicket")
    public ResponseEntity<Ticket> getTicket(@RequestParam Long ticketId) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        return ResponseEntity.ok(ticket);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @PostMapping("/book/{userId}")
    public ResponseEntity<Ticket> bookTicket(@PathVariable Long userId, @RequestBody TicketDto ticketDto) {
        Ticket bookedTicket = ticketService.bookTicket(userId, ticketDto);
        bookedTicket.setStatus(Ticket.TicketStatus.BOOKED);
        ticketRepository.save(bookedTicket);
        return new ResponseEntity<>(bookedTicket, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getUserBookedTickets(@PathVariable Long userId) {
        List<Ticket> bookedTickets = ticketService.getUserBookedTickets(userId);
        return new ResponseEntity<>(bookedTickets, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @DeleteMapping("/cancel/{ticketId}")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId) {
        ticketService.cancelTicket(ticketId);
        return new ResponseEntity<>("Ticket canceled successfully", HttpStatus.OK);
    }


}
