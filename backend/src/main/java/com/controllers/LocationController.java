package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Location;
import com.services.LocationService;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/getLocation")
    public ResponseEntity<Location> getLocationById(@RequestParam Long id) { 
        
        Location location;

        try {
            location = locationService.getLocationById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        if (location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // .. add more API endpoints as needed
}
