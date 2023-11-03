package com.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;


// NOTE: entity/table is called Users (plural) because "user" is a defined keyword in postgreSQL.

@Entity(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;
    private String lastName;

    private String email;
    private String phone;
    private LocalDate dateOfBirth;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval =  true)
    private Membership membership;

    public Users(String firstName, String lastName, String email, String phone, 
        LocalDate dateOfBirth, String username, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
        this.password = password;
        this.role = role;
        this.membership = null;
    }

    // default constructor
    public Users() {}

    public Long getUserId() { return this.userId; }

    public String getFirstName() { return this.firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return this.lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return this.phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDateOfBirth() { return this.dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return this.role; }
    public void setRole(Role role) { this.role = role; }

    @JsonIgnore
    public Membership getMembership() { return this.membership; }
    public void setMembership(Membership membership) { this.membership = membership; }
    
    public enum Role {
        USER,
        MEMBER,
        ADMIN
    }
}
