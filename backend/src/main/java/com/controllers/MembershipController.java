package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Membership;
import com.services.MembershipService;

@RestController
@RequestMapping("/api/memberships")
public class MembershipController {
    
    private final MembershipService membershipService;

    @Autowired
    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping("/getMembership/user")
    public ResponseEntity<Membership> getMembershipByUserId(@RequestParam Long userId) { 
        
        Membership membership;

        try {
            membership = membershipService.findByUserId(userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        if (membership != null) {
            return ResponseEntity.ok(membership);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/create")
    public ResponseEntity<Membership> createMembership(@RequestBody Membership membership) {

        Membership createdMembership;
        try {
            createdMembership = membershipService.createMembership(membership.getUser(), membership.getExpirationDate(), membership.getMembershipType());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        if (createdMembership != null) {
            return ResponseEntity.ok(createdMembership);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/getMembership")
    public ResponseEntity<Membership> getMembershipById(@RequestParam Long id) { 
        
        Membership membership;

        try {
            membership = membershipService.getMembershipById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        
        if (membership != null) {
            return ResponseEntity.ok(membership);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    // .. add more API endpoints as needed
}
