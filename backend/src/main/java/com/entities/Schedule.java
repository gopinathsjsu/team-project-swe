package com.entities;

import jakarta.persistence.*;

@Entity(name="schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "theater_id")
    private Theater theater;

    public Long getScheduleId() { return this.scheduleId; }

    public Movie getMovie() { return this.movie; }
    public void setMovie(Movie movie) { this.movie = movie; }

    public Theater getTheater() { return this.theater; }
    public void setTheater(Theater theater) { this.theater = theater; }
    
}
