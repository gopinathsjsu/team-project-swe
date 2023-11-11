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

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public Showtime(LocalTime time, LocalDate date, Movie movie) {
        this.time = time;
        this.date = date;
        this.movie = movie;
    }
    public Showtime() { }

    public Long getShowtimeId() { return this.showtimeId; }

    public LocalTime getStartTime() { return this.time; }
    public void setStartTime(LocalTime startTime) { this.time = startTime; }

    public LocalDate getMovieDate() { return this.date; }
    public void setMovieDate(LocalDate date) { this.date = date; }

}
