package com.entities;

import jakarta.persistence.*;


// NOTE: entity/table is called Users (plural) because "user" is a defined keyword in postgreSQL.

@Entity(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public Users(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Users() { }

    public Long getUserId() { return this.userId; }

    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return this.role; }
    public void setRole(Role role) { this.role = role; }

    public enum Role {
        USER,
        MEMBER,
        ADMIN
    }
}
