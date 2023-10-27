package com.controllers;

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

import com.dataTransferObjects.MembershipCreationRequest;
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

        membership = membershipService.findByUserId(userId);
        
        if (membership != null) {
            return ResponseEntity.ok(membership);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/create")
    public ResponseEntity<Object> createMembership(@RequestParam Long userId, @RequestBody MembershipCreationRequest membershipCreationRequest) {

        if (membershipService.hasMembership(userId)) {
            // User already has a membership, return a conflict response
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already has a membership.");
        }

        Membership createdMembership = membershipService.createMembership(userId, membershipCreationRequest.getExpirationDate(), membershipCreationRequest.getMembershipType());

        if (createdMembership != null) {
            return ResponseEntity.ok(createdMembership);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/getMembership")
    public ResponseEntity<Membership> getMembershipById(@RequestParam Long id) { 
        
        Membership membership;

        membership = membershipService.getMembershipById(id);
        
        if (membership != null) {
            return ResponseEntity.ok(membership);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMembership(@RequestParam Long userId) {

        boolean deleted = false;
        if (userId != null) {
            deleted = membershipService.deleteMembershipById(userId);
        }

        if (deleted) {
            return ResponseEntity.ok("Membership deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Membership not found or could not be deleted.");
        }

    }
    

    // .. add more API endpoints as needed
}
