package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/getUser")
    public ResponseEntity<Users> getUserById(@RequestParam Long id) { 
        
        Users user;

        try {
            user = usersService.getUserById(id);
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
        try {
            createdUser = usersService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        if (createdUser != null) {
            return ResponseEntity.ok(createdUser);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    // .. add more API endpoints as needed
}
