package com.entities;

import jakarta.persistence.*;

@Entity(name="theater")
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theater_id")
    private Long theaterId;
    private String name; // i.e. screen #
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "multiplex_id")
    private Multiplex multiplex;

    public Theater(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    public Theater() {

    }

    public Long getTheaterId() { return this.theaterId; }

    public String getTheaterName() { return this.name; }
    public void setTheaterName(String name) { this.name = name; }

    public int getCapacity() { return this.capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    
}
