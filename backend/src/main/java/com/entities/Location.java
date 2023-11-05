package com.entities;

import jakarta.persistence.*;

@Entity(name="location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    private String name;

    public Location(String name) {
        this.name=name;
    }

    public Location() { }

    public Long getLocationId() { return this.locationId; }

    public String getLocation() { return this.name; }
    public void setLocation(String location) { this.name = location; }
    
}
