package com.teamSweProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.teamSweProject.entities.Location;
import com.teamSweProject.services.LocationService;

import java.util.List;


@RestController
@RequestMapping("/api/locations")
public class LocationController {
    
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/getLocation")
    public ResponseEntity<Location> getLocationById(@RequestParam Long id) { 
        
        Location location;

        try {
            location = locationService.findLocationById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        if (location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    // get Location by locationName
    @GetMapping("/getByName/{locationName}")
    public ResponseEntity<Location> getLocationByName(@PathVariable String locationName) {
        try {
            Location location = locationService.findByLocationName(locationName);

            if (location != null) {
                return ResponseEntity.ok(location);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Location> createLocation(@RequestParam String locationName) {
        Location createdLocation = locationService.createLocation(locationName);

        if (createdLocation != null) {
            return ResponseEntity.ok(createdLocation);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLocation(@RequestParam Long locationId) {
        boolean success = locationService.deleteLocation(locationId);

        if (success) {
            return ResponseEntity.ok("Location deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Location not found or could not be deleted.");
        }
    }





    // .. add more API endpoints as needed
}
