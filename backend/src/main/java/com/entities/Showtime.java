package com.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity(name="showtime")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showtimeId;
    private LocalTime time;
    private LocalDate date;
    private int duration;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    public Showtime(LocalTime time, LocalDate date, int duration) {
        this.time = time;
        this.date = date;
        this.duration = duration;
    }

    public Long getShowtimeId() { return this.showtimeId; }

    public LocalTime getStartTime() { return this.time; }
    public void setStartTime(LocalTime startTime) { this.time = startTime; }

    public LocalDate getMovieDate() { return this.date; }
    public void setMovieDate(LocalDate date) { this.date = date; }

    public int getDuration() { return this.duration; }
    public void setDuration(int duration) { this.duration = duration; }

}
