package com.services;

import com.entities.Multiplex;
import com.entities.Theater;
import com.repositories.MultiplexRepository;
import com.repositories.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class TheaterService {
    private final TheaterRepository theaterRepository;
    private final MultiplexRepository multiplexRepository;

    @Autowired
    public TheaterService(TheaterRepository theaterRepository, MultiplexRepository multiplexRepository) {
        this.theaterRepository = theaterRepository;
        this.multiplexRepository = multiplexRepository;
    }

    public List<Theater> getTheatersByMultiplexId(Long multiplexId) throws InstanceNotFoundException {
        Optional<Multiplex> multiplexOptional = multiplexRepository.findById(multiplexId);

        if (multiplexOptional.isPresent()) {
            Multiplex multiplex = multiplexOptional.get();
            return theaterRepository.findByMultiplex(multiplex);
        } else {
            throw new InstanceNotFoundException("Multiplex not found with ID: " + multiplexId);
        }
    }

    public Optional<Theater> findByName(String name) {
        return theaterRepository.findByName(name);
    }
    
}
