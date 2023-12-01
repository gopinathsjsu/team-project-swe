package com.teamSweProject.entities;

import jakarta.persistence.*;

@Entity(name="location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    private String locationName;

    public Location(String locationName) {
        this.locationName = locationName;
    }

    public Location() { }

    public Long getLocationId() { return this.locationId; }

    public String getLocation() { return this.locationName; }
    public void setLocation(String location) { this.locationName = location; }
    
}
