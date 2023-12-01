package com.teamSweProject.controllers;

import com.teamSweProject.dataTransferObjects.TicketDto;
import com.teamSweProject.dataTransferObjects.TicketResponseDTO;
import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Ticket;
import com.teamSweProject.repositories.TicketRepository;
import com.teamSweProject.services.TicketService;
import jakarta.persistence.EntityNotFoundException;
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

    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getTicket")
    public ResponseEntity<TicketResponseDTO> getTicket(@RequestParam Long ticketId) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        if (ticket == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        TicketResponseDTO responseDTO = createTicketResponseDTO(ticket);

        return ResponseEntity.ok(responseDTO);
    }

    private TicketResponseDTO createTicketResponseDTO(Ticket ticket) {
        TicketResponseDTO responseDTO = new TicketResponseDTO();
        responseDTO.setTicketId(ticket.getTicketId());
        responseDTO.setStatus(ticket.getStatus());
        responseDTO.setTheaterName(ticket.getTheaterAssignment().getTheaterName());
        responseDTO.setPrice(ticket.getPrice());
        responseDTO.setSeatAssignment(ticket.getSeatAssignment());
        responseDTO.setMultiplexName(ticket.getMultiplex().getMultiplexName());

        // Set showDate and showTime using the modified method
        responseDTO.setShowDate(ticket.getShowtime().getDate());
        responseDTO.setShowTime(ticket.getShowtime().getTime());

        return responseDTO;
    }

    @GetMapping("/watched/{userId}")
    public ResponseEntity<List<Movie>> getMoviesWatchedInLast30Days(@PathVariable Long userId) {
        try {
            List<Movie> watchedMovies = ticketService.getMoviesWatchedInLast30Days(userId);
            return new ResponseEntity<>(watchedMovies, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
