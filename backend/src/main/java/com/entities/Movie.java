package com.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity(name="movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String title;
    private float rating;
    private Date releaseDate;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public Movie(String title, float rating, Date releaseDate, Genre genre) {
        this.title = title;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.genre = genre;
    }

    public Movie() { }

    public Long getMovieId() { return this.movieId; }

    public String getTitle() { return this.title; }
    public void setTitle(String title) { this.title = title; }

    public float getRating() { return this.rating; }
    public void setRating(float rating) { this.rating = rating; }

    public Date getReleaseDate() { return this.releaseDate; }
    public void setRating(Date releaseDate) { this.releaseDate = releaseDate; }

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
        CRIME,
        OTHER
    }
}
