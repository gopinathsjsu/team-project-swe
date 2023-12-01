package com.teamSweProject.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity(name="ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private LocalDateTime bookingDate;

    private BigDecimal price;

    private String seatAssignment; // e.g. "A12" (row A, seat 12)
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Users user;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "assigned_movie_id", referencedColumnName = "movie_id")
    private Movie assignedMovie;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "showtime_id", referencedColumnName = "showtime_id")
    private Showtime showtime;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "theater_id", referencedColumnName = "theater_id")
    private Theater theaterAssignment;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "multiplex_id", referencedColumnName = "multiplex_id")
    private Multiplex multiplex;


    public Long getTicketId() { return this.ticketId; }
    
    public LocalDateTime getBookingDate() { return this.bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public TicketStatus getStatus() { return this.status; }
    public void setStatus(TicketStatus status) { this.status= status; }    

    public Users getUser() { return this.user; }
    public void setUser(Users user) { this.user= user; }

    public Showtime getShowtime() { return this.showtime; }
    public void setShowtime(Showtime showtime) { this.showtime = showtime; }

    public String getSeatAssignment() { return this.seatAssignment; }
    public void setSeatAssignment(String seatAssignment) { this.seatAssignment = seatAssignment; }

    public Movie getAssignedMovie() { return this.assignedMovie; }
    public void setAssignedMovie(Movie assignedMovie) { this.assignedMovie = assignedMovie; }

    public Multiplex getMultiplex() { return this.multiplex; }
    public void setMultiplex(Multiplex multiplex) { this.multiplex = multiplex; }

    public Theater getTheaterAssignment() { return this.theaterAssignment; }
    public void setTheaterAssignment(Theater theaterAssignment) { this.theaterAssignment = theaterAssignment; }

    public enum TicketStatus {
        BOOKED,
        CANCELED,
        USED,
        EXPIRED,
        PENDING
    }

}
