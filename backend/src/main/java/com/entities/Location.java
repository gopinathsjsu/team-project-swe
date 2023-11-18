package com.entities;

import jakarta.persistence.*;

@Entity(name="location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    private String locationName;

    public Location(String name) {
        this.locationName =name;
    }

    public Location() { }

    public Long getLocationId() { return this.locationId; }

    public String getLocation() { return this.locationName; }
    public void setLocation(String location) { this.locationName = location; }
    
}
