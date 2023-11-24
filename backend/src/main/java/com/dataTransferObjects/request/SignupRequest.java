package com.dataTransferObjects.request;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import jakarta.validation.constraints.*;

public class SignupRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;


    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String phone;

    private LocalDate dob;

    private String role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() { return this.phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDob() { return this.dob; }

    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
