package com.controllers;

import java.util.List;

import com.entities.Ticket;
import com.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entities.Users;
import com.services.UsersService;

import javax.management.InstanceNotFoundException;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UsersService usersService;
    private final TicketService ticketService;

    @Autowired
    public UserController(UsersService usersService, TicketService ticketService) {
        this.usersService = usersService;
        this.ticketService = ticketService;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getAllUsers() {
        try {
            List<Users> users = usersService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<Users> getUserById(@RequestParam Long id) { 
        
        Users user;

        try {
            user = usersService.findUserById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Users> updateUserByUsername(@RequestParam String username, @RequestBody Users updatedUser) {

        Users user;

        try {
            user = usersService.updateUserByUsername(username, updatedUser);
        } catch (InstanceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {

        Users createdUser;
        
        createdUser = usersService.createUser(user.getFirstName(), user.getLastName(), 
            user.getEmail(), user.getPhone(), user.getDateOfBirth(), user.getUsername(), 
            user.getPassword(), user.getRole());

        
        if (createdUser != null) {
            return ResponseEntity.ok(createdUser);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/{userId}/getTickets")
    public ResponseEntity<List<Ticket>> getTickets(@PathVariable Long userId) {
        try {
            List<Ticket> tickets = ticketService.getTicketsByUserId(userId);
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } catch (InstanceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("{userId}/getRewardPoints")
    public ResponseEntity<Integer> getRewardPoints(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(usersService.getUserRewardPoints(userId));
        } catch (InstanceNotFoundException err) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("{userId}/incrementRewardPoints")
    public ResponseEntity<String> incrementRewardPoints(@PathVariable Long userId, @RequestParam int rewardPoints) {
        try {
            usersService.incrementUserRewardPoints(userId, rewardPoints);
            return ResponseEntity.ok("Reward points incremented successfully");
        } catch (InstanceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam Long userId) {

        boolean success = usersService.deleteUser(userId);

        if (success) {
            return ResponseEntity.ok("User and associated membership deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found or could not be deleted.");
        }
        
    }

    // .. add more API endpoints as needed
}
