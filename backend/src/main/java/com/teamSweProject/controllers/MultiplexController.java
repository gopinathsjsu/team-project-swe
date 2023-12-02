package com.teamSweProject.controllers;

import com.teamSweProject.dataTransferObjects.MultiplexResponseDTO;
import com.teamSweProject.entities.Theater;
import com.teamSweProject.entities.Multiplex;
import com.teamSweProject.services.MultiplexService;
import com.teamSweProject.services.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/multiplexes")
public class MultiplexController {

    private final MultiplexService multiplexService;
    private final TheaterService theaterService;

    @Autowired
    public MultiplexController(MultiplexService multiplexService, TheaterService theaterService) {
        this.multiplexService = multiplexService;
        this.theaterService = theaterService;
    }

    // get Multiplex by location id
    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<List<MultiplexResponseDTO>> getMultiplexesByLocationId(@PathVariable Long id) {
        List<MultiplexResponseDTO> multiplexes = multiplexService.getMultiplexesByLocationId(id);
        return new ResponseEntity<>(multiplexes, HttpStatus.OK);

//        List<Multiplex> multiplexes;
//
//        try {
//            multiplexes = multiplexService.findByLocationId(id);
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().build();
//        }
//
//        if (multiplexes != null) {
//            return ResponseEntity.ok(multiplexes);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
    }

    // create Multiplex
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create/{locationId}")
    public ResponseEntity<Object> createMultiplex(@PathVariable Long locationId, @RequestParam String name) {

        Multiplex createdMultiplex = multiplexService.createMultiplex(name, locationId);

        if (createdMultiplex != null) {
            return ResponseEntity.ok(createdMultiplex);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // get theaters for multiplex
    @PreAuthorize("hasRole('USER') or hasRole('MEMBER') or hasRole('ADMIN')")
    @GetMapping("/{multiplexId}/getTheaters")
    public ResponseEntity<List<Theater>> getTheatersByMultiplexId(@PathVariable Long multiplexId) throws InstanceNotFoundException {
        List<Theater> theaters = theaterService.getTheatersByMultiplexId(multiplexId);
        return new ResponseEntity<>(theaters, HttpStatus.OK);
    }

    // delete Multiplex
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMultiplex(@RequestParam Long id) {
        boolean success = multiplexService.deleteMultiplex(id);

        if (success) {
            return ResponseEntity.ok("Multiplex deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Multiplex not found or could not be deleted.");
        }
    }
}
