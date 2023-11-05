package com.controllers;

import com.entities.Multiplex;
import com.services.MultiplexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/multiplexes")
public class MultiplexController {

    private final MultiplexService multiplexService;

    @Autowired
    public MultiplexController(MultiplexService multiplexService) {
        this.multiplexService = multiplexService;
    }

    // get Multiplex by location id
    @GetMapping("/get/{id}")
    public ResponseEntity<List<Multiplex>> getMultiplexesByLocationId(@PathVariable Long id) {

        List<Multiplex> multiplexes;

        try {
            multiplexes = multiplexService.findByLocationId(id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        if (multiplexes != null) {
            return ResponseEntity.ok(multiplexes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // create Multiplex
    @PostMapping("/create/{locationId}")
    public ResponseEntity<Object> createMultiplex(@PathVariable Long locationId, @RequestParam String name) {

        Multiplex createdMultiplex = multiplexService.createMultiplex(name, locationId);

        if (createdMultiplex != null) {
            return ResponseEntity.ok(createdMultiplex);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // delete Multiplex
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
