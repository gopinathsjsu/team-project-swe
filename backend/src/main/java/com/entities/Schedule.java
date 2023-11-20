package com.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "multiplex_id", unique = true)  // Ensure a unique constraint
    private Multiplex multiplex;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "schedule_movies",
            joinColumns = @JoinColumn(name = "schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    private List<Movie> movies = new ArrayList<>();
    public Long getScheduleId() {
        return this.scheduleId;
    }

    public Multiplex getMultiplex() {
        return this.multiplex;
    }

    public void setMultiplex(Multiplex multiplex) {
        this.multiplex = multiplex;
    }

    public List<Movie> getMovies() {
        return this.movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
