package com.entities;
import jakarta.persistence.*;

@Entity(name = "multiplex")
public class Multiplex {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long multiplexId;
    private String name;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    public Multiplex(String multiplexName, Location location) {
        this.name = multiplexName;
        this.location = location;
    }

    public Multiplex() { }

    public Long getMultiplexId() { return this.multiplexId; }

    public String getMultiplexName() { return this.name; }
    public void setMultiplexName(String multiplexName) { this.name = multiplexName; }

    public Location getLocation() { return this.location; }
    public void setLocation(Location location) { this.location = location; }

}
