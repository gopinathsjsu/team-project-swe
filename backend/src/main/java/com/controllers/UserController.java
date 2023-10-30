package com.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Users;
import com.services.UsersService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UsersService usersService;

    @Autowired
    public UserController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersService.getAllUsers();

        return ResponseEntity.ok(users);
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

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(Long userId) {
       
        try {
            usersService.deleteUser(userId);
            return ResponseEntity.ok("User and associate membership deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found or could not be deleted.");
        }
        
    }

    // .. add more API endpoints as needed
}
