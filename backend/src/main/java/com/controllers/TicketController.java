package com.controllers;

import com.dataTransferObjects.TicketDto;
import com.entities.Ticket;
import com.repositories.TicketRepository;
import com.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/book/{userId}")
    public ResponseEntity<Ticket> bookTicket(@PathVariable Long userId, @RequestBody TicketDto ticketDto) {
        Ticket bookedTicket = ticketService.bookTicket(userId, ticketDto);
        bookedTicket.setStatus(Ticket.TicketStatus.BOOKED);
        ticketRepository.save(bookedTicket);
        return new ResponseEntity<>(bookedTicket, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getUserBookedTickets(@PathVariable Long userId) {
        List<Ticket> bookedTickets = ticketService.getUserBookedTickets(userId);
        return new ResponseEntity<>(bookedTickets, HttpStatus.OK);
    }

    @DeleteMapping("/cancel/{ticketId}")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId) {
        ticketService.cancelTicket(ticketId);
        return new ResponseEntity<>("Ticket canceled successfully", HttpStatus.OK);
    }


}
