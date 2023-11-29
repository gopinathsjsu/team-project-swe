package com.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name="movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Long movieId;
    private String title;
    private float rating;
    private Date releaseDate;
    private String duration;

    private String description;
    private String poster;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showtime> showtimes = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public Movie(String title, float rating, Date releaseDate, Genre genre, String duration, String description, String poster) {
        this.title = title;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.duration = duration;
        this.description = description;
        this.poster = poster;
    }

    public Movie() { }

    public Long getMovieId() { return this.movieId; }

    public String getTitle() { return this.title; }
    public void setTitle(String title) { this.title = title; }

    public float getRating() { return this.rating; }
    public void setRating(float rating) { this.rating = rating; }

    public Date getReleaseDate() { return this.releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }
    public void setRating(Date releaseDate) { this.releaseDate = releaseDate; }

    public Genre getGenre() { return this.genre; }
    public void setGenre(Genre genre) { this.genre = genre; }

    public String getDuration() { return this.duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }

    public String getPoster() { return this.poster; }
    public void setPoster(String poster) { this.poster = poster; }

    public List<Showtime> getShowtimes() { return this.showtimes; }

    public void setShowtimes(List<Showtime> showtimes) { this.showtimes = showtimes; }
    public void addShowtime(Showtime showtime) { this.showtimes.add(showtime); }

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
        MYSTERY,
        OTHER
    }
}
