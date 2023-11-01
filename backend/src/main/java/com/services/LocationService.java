package com.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entities.Location;
import com.repositories.LocationRepository;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) { 
        this.locationRepository = locationRepository;
    }

    // list all movie multiplex locations
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // create new location
    public Location createLocation(String locationName) {
        Location location = new Location(locationName);
        
        return locationRepository.save(location);
    }
    
    // get a specific location record via its id
    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    // save location record in db
    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    // delete location record from db
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
}
