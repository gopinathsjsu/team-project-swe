package com.entities;

import jakarta.persistence.*;

@Entity(name="movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String title;
    private String director;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public Movie(String title, String director, Genre genre) {
        this.title = title;
        this.director = director;
        this.genre = genre;
    }

    public Long getMovieId() { return this.movieId; }

    public String getTitle() { return this.title; }
    public void setTitle(String title) { this.title = title; }

    public String getDirector() { return this.director; }
    public void setDirector(String director) { this.director = director; }

    public Genre getGenre() { return this.genre; }
    public void setGenre(Genre genre) { this.genre = genre; }

    public enum Genre {
        ACTION,
        ADVENTURE,
        COMEDY,
        DRAMA,
        HORROR,
        ROMANCE,
        SCIENCE_FICTION,
        FANTASY,
        HISTORICAL,
        CRIME
    }
}
