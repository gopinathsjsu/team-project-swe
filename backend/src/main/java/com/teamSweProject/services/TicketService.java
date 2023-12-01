package com.teamSweProject.services;

import com.teamSweProject.entities.*;
import com.teamSweProject.repositories.*;
import com.teamSweProject.dataTransferObjects.TicketDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.InstanceNotFoundException;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UsersRepository usersRepository;
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final MultiplexRepository multiplexRepository;
    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository, UsersRepository usersRepository,
                         MovieRepository movieRepository, TheaterRepository theaterRepository,
                         MultiplexRepository multiplexRepository, ShowtimeRepository showtimeRepository) {
        this.ticketRepository = ticketRepository;
        this.usersRepository = usersRepository;
        this.movieRepository = movieRepository;
        this.theaterRepository = theaterRepository;
        this.multiplexRepository = multiplexRepository;
        this.showtimeRepository = showtimeRepository;
    }

    public List<Ticket> getTicketsByUserId(Long userId) throws InstanceNotFoundException {
         Optional<Users> user = usersRepository.findById(userId);

         if (user.isPresent()) {
             return ticketRepository.findByUser(user.get());
         } else {
             throw new InstanceNotFoundException("Tickets not found for user ID: " + userId);
         }

    }

    @Transactional
    public Ticket bookTicket(Long userId, TicketDto ticketDto) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Ticket ticket = new Ticket();
        ticket.setBookingDate(LocalDateTime.now());
        ticket.setStatus(Ticket.TicketStatus.PENDING);
        ticket.setUser(user);
        ticket.setSeatAssignment(ticketDto.getSeatAssignment());

        Movie assignedMovie = movieRepository.findByTitle(ticketDto.getAssignedMovieName())
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));
        Theater assignedTheater = theaterRepository.findByName(ticketDto.getTheaterName())
                .orElseThrow(() -> new EntityNotFoundException("Theater not found"));
        Multiplex assignedMultiplex = multiplexRepository.findByName(ticketDto.getMultiplexName())
                .orElseThrow(() -> new EntityNotFoundException("Multiplex not found"));

        movieRepository.save(assignedMovie);
        theaterRepository.save(assignedTheater);
        multiplexRepository.save(assignedMultiplex);

        ticket.setAssignedMovie(assignedMovie);
        ticket.setTheaterAssignment(assignedTheater);
        ticket.setMultiplex(assignedMultiplex);

        Showtime showtime = new Showtime(
                ticketDto.getShowDateTime().toLocalTime(),
                ticketDto.getShowDateTime().toLocalDate(),
                assignedMovie,
                assignedTheater,
                assignedMultiplex
        );
        showtimeRepository.save(showtime);
        ticket.setShowtime(showtime);

        // Set ticket price based on showDateTime
        ticket.setPrice(calculateTicketPrice(ticketDto.getShowDateTime()));

        Ticket savedTicket = ticketRepository.save(ticket);
        user.getTickets().add(savedTicket);

        assignedTheater.setCapacity(assignedTheater.getCapacity() - 1); // mark one seat in the theater as occupied
        theaterRepository.save(assignedTheater);

        return savedTicket;
    }

    public void cancelTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        ticket.setStatus(Ticket.TicketStatus.CANCELED);

        // remove ticket from user's list of tickets
        Users user = ticket.getUser();
        user.getTickets().remove(ticket);

        Theater theater = ticket.getTheaterAssignment();
        theater.setCapacity(theater.getCapacity() + 1); // free up one seat in the theater

        theaterRepository.save(theater);
        usersRepository.save(user);
        ticketRepository.save(ticket);
    }

    public List<Ticket> getUserBookedTickets(Long userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return user.getTickets();
    }

    // Pricing logic based on showDateTime
    // default price = $12
    // before 6pm = $10
    // tuesday shows = $6
    private BigDecimal calculateTicketPrice(LocalDateTime showDateTime) {
        // Default price
        BigDecimal price = new BigDecimal("12.00");

        // Additional pricing logic based on showDateTime
        LocalTime showTime = showDateTime.toLocalTime();
        DayOfWeek dayOfWeek = showDateTime.getDayOfWeek();

        if (showTime.isBefore(LocalTime.of(18, 0))) {
            price = new BigDecimal("10.00");
        }

        if (dayOfWeek == DayOfWeek.TUESDAY) {
            price = new BigDecimal("6.00");
        }

        return price;
    }

}
