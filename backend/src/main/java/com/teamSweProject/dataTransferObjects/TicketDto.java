package com.teamSweProject.dataTransferObjects;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TicketDto {
    private String seatAssignment;
    private LocalDateTime showDateTime;
    private String assignedMovieName;
    private String theaterName;
    private String multiplexName;

    public String getSeatAssignment() {
        return seatAssignment;
    }

    public void setSeatAssignment(String seatAssignment) {
        this.seatAssignment = seatAssignment;
    }

    public LocalDateTime getShowDateTime() {
        return showDateTime;
    }

    public void setShowDateTime(LocalDateTime showDateTime) {
        this.showDateTime = showDateTime;
    }


    public String getAssignedMovieName() {
        return assignedMovieName;
    }

    public void setAssignedMovieName(String assignedMovieName) {
        this.assignedMovieName = assignedMovieName;
    }

    public String getTheaterName() {
        return theaterName;
    }

    public void setTheaterName(String theaterName) {
        this.theaterName = theaterName;
    }

    public String getMultiplexName() {
        return multiplexName;
    }

    public void setMultiplexName(String multiplexName) {
        this.multiplexName = multiplexName;
    }

}
