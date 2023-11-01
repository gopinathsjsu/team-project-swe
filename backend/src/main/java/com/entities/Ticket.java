package com.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity(name="ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private int capacity;
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    public Long getTicketId() { return this.ticketId; }

    public int getCapacity() { return this.capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    
    public LocalDateTime getBookingDate() { return this.bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public TicketStatus getStatus() { return this.status; }
    public void setStatus(TicketStatus status) { this.status= status; }    

    public Users getUser() { return this.user; }
    public void setUser(Users user) { this.user= user; }

    public Showtime getShowtime() { return this.showtime; }
    public void setShowtime(Showtime showtime) { this.showtime = showtime; }

    public enum TicketStatus {
        BOOKED,
        CANCELED,
        USED,
        EXPIRED,
        PENDING
    }

}
