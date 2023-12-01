package com.teamSweProject.services;

import com.teamSweProject.entities.Movie;
import com.teamSweProject.entities.Multiplex;
import com.teamSweProject.entities.Theater;
import com.teamSweProject.entities.Ticket;
import com.teamSweProject.repositories.MovieRepository;
import com.teamSweProject.repositories.MultiplexRepository;
import com.teamSweProject.repositories.TheaterRepository;
import com.teamSweProject.repositories.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TheaterService {
    private final TheaterRepository theaterRepository;
    private final MultiplexRepository multiplexRepository;
    private final MovieRepository movieRepository;
    private final TicketRepository ticketRepository;

    @Autowired
    public TheaterService(TheaterRepository theaterRepository,
                          MultiplexRepository multiplexRepository,
                          MovieRepository movieRepository,
                          TicketRepository ticketRepository) {

        this.theaterRepository = theaterRepository;
        this.multiplexRepository = multiplexRepository;
        this.movieRepository = movieRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<Theater> getTheatersByMultiplexId(Long multiplexId) throws InstanceNotFoundException {
        Optional<Multiplex> multiplexOptional = multiplexRepository.findById(multiplexId);

        if (multiplexOptional.isPresent()) {
            Multiplex multiplex = multiplexOptional.get();
            return theaterRepository.findByMultiplex(multiplex);
        } else {
            throw new InstanceNotFoundException("Multiplex not found with ID: " + multiplexId);
        }
    }

    public Theater getTheaterByMovieIdAndMultiplexId(Long movieId, Long multiplexId) {
        Optional<Multiplex> multiplexOptional = multiplexRepository.findById(multiplexId);
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (multiplexOptional.isPresent() && movieOptional.isPresent()) {
            Multiplex multiplex = multiplexOptional.get();
            Movie movie = movieOptional.get();
            return theaterRepository.findByAssignedMovieAndMultiplex(movie, multiplex);
        } else {
            throw new EntityNotFoundException("Multiplex or Movie not found with ID: " + multiplexId + " " + movieId);
        }
    }

    public Optional<Theater> findByName(String name) {
        return theaterRepository.findByName(name);
    }

    public void assignMovieToTheater(Theater theater, Long movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isPresent()) {
            theater.setAssignedMovie(movie.get());
            theaterRepository.save(theater);
        } else {
            throw new EntityNotFoundException("Movie not found with ID: " + movieId);
        }

    }

    public Movie findAssignedMovieIdByTheaterId(Long theaterId) {
        Optional<Theater> theaterOptional = theaterRepository.findById(theaterId);

        if (theaterOptional.isPresent()) {
            Theater theater = theaterOptional.get();
            return theater.getAssignedMovie();
        } else {
            throw new EntityNotFoundException("Theater not found with theaterId:" + theaterId);
        }
    }

    public List<Theater> getAllTheaters() {
        return theaterRepository.findAll();
    }

    public Theater getTheaterById(Long theaterId) {
        return theaterRepository.findById(theaterId)
                .orElseThrow(() -> new EntityNotFoundException("Theater not found with ID: " + theaterId));
    }

    public void updateCapacity(Long theaterId, Integer capacity) {
        Optional<Theater> theaterOptional = theaterRepository.findById(theaterId);
        if (theaterOptional.isPresent()) {
            Theater theater = theaterOptional.get();
            theater.setCapacity(capacity);
            theaterRepository.save(theater);
        } else {
            throw new EntityNotFoundException("Theater not found with ID: " + theaterId);
        }
    }

    public void updateOccupancy(Long theaterId) {
        Optional<Theater> theaterOptional = theaterRepository.findById(theaterId);
        if (theaterOptional.isPresent()) {
            Theater theater = theaterOptional.get();

            int purchasedTickets = ticketRepository.countByTheaterAssignmentTheaterIdAndStatus(theaterId, Ticket.TicketStatus.BOOKED);

            if (purchasedTickets <= theater.getCapacity()) {
                theater.setOccupancy(purchasedTickets);
                theaterRepository.save(theater);
            } else {
                throw new IllegalArgumentException("Purchased tickets exceed theater capacity");
            }
        } else {
            throw new EntityNotFoundException("Theater not found with ID: " + theaterId);
        }
    }


    public int getOccupancyForLastNDaysByLocation(Long theaterId, int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return ticketRepository.countByTheaterAssignmentTheaterIdAndBookingDateAfter(theaterId, startDate);
    }

    public int getOccupancyForLastNDaysByMovie(Long movieId, int days) {
        // Assuming you have a method in TicketRepository for counting tickets by movie and status
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return ticketRepository.countByAssignedMovieMovieIdAndBookingDateAfterAndStatus(movieId, startDate, Ticket.TicketStatus.BOOKED);
    }



}
