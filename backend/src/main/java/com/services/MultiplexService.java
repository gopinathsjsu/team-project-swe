package com.services;

import com.entities.Location;
import com.entities.Membership;
import com.entities.Multiplex;
import com.repositories.MultiplexRepository;
import com.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.List;

@Service
public class MultiplexService {

    private final MultiplexRepository multiplexRepository;
    private final LocationService locationService;
    private final static Logger logger = LoggerFactory.getLogger(MultiplexService.class);

    @Autowired
    public MultiplexService(MultiplexRepository multiplexRepository, LocationService locationService) {

        this.multiplexRepository = multiplexRepository;
        this.locationService = locationService;
    }

    // get all Multiplexes by Location
    public List<Multiplex> findByLocationId(Long locationId) {

        return multiplexRepository.findByLocationLocationId(locationId);

    }

    // create Multiplex
    public Multiplex createMultiplex(String name, Long locationId) {

        Location location = locationService.findLocationById(locationId);
        Multiplex multiplex = new Multiplex(name, location);

        return multiplexRepository.save(multiplex);
    }

    // delete Multiplex
    public boolean deleteMultiplex(Long id) {
        try {
            multiplexRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            logger.error("Failed to delete multiplex", e);
            return false;
        }
    }

}
