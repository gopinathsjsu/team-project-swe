package com.teamSweProject.dataTransferObjects;

import com.teamSweProject.entities.Ticket;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TicketResponseDTO {
    private Long ticketId;
    private LocalDate showDate;
    private LocalTime showTime;
    private Ticket.TicketStatus status;
    private String theaterName;
    private BigDecimal price;
    private String seatAssignment;
    private String multiplexName;

    public Long getTicketId() { return this.ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public LocalDate getShowDate() {
        return this.showDate;
    }

    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }

    public LocalTime getShowTime() {
        return this.showTime;
    }

    public void setShowTime(LocalTime showTime) {
        this.showTime = showTime;
    }
    public Ticket.TicketStatus getStatus() { return this.status; }
    public void setStatus(Ticket.TicketStatus status) { this.status = status; }
    public String getTheaterName() { return this.theaterName; }
    public void setTheaterName(String theaterName) { this.theaterName = theaterName; }
    public BigDecimal getPrice() { return this.price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getSeatAssignment() { return this.seatAssignment; }
    public void setSeatAssignment(String seatAssignment) { this.seatAssignment = seatAssignment; }
    public String getMultiplexName() { return this.multiplexName; }
    public void setMultiplexName(String multiplexName) { this.multiplexName = multiplexName; }

}
