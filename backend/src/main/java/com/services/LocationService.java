package com.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entities.Location;
import com.repositories.LocationRepository;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    private final static Logger logger = LoggerFactory.getLogger(LocationService.class);

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
    public Location findLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }


    // delete location record from db
    public boolean deleteLocation(Long id) {
        try {
            locationRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            logger.error("Failed to delete location", e);
            return false;
        }

    }
}
