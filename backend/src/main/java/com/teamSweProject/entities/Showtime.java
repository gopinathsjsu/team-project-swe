package com.teamSweProject.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity(name = "showtime")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showtime_id")
    private Long showtimeId;

    private LocalTime time;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "theater_id")
    @JsonIgnore
    private Theater theater;

    @ManyToOne
    @JoinColumn(name = "multiplex_id")
    @JsonIgnore
    private Multiplex multiplex;

    public Showtime() { }

    public Showtime(LocalTime time, LocalDate date, Movie movie, Theater theater, Multiplex multiplex) {
        this.time = time;
        this.date = date;
        this.movie = movie;
        this.theater = theater;
        this.multiplex = multiplex;
    }

    public Long getShowtimeId() {
        return this.showtimeId;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Movie getMovie() {
        return this.movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Theater getTheater() {
        return this.theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public Multiplex getMultiplex() {
        return this.multiplex;
    }

    public void setMultiplex(Multiplex multiplex) {
        this.multiplex = multiplex;
    }
}
