package com.teamSweProject.controllers;

import com.teamSweProject.dataTransferObjects.request.LoginRequest;
import com.teamSweProject.dataTransferObjects.request.SignupRequest;
import com.teamSweProject.dataTransferObjects.response.JwtResponse;
import com.teamSweProject.entities.Users;
import com.teamSweProject.repositories.UsersRepository;
import com.teamSweProject.security.jwt.JwtUtils;
import com.teamSweProject.security.services.UserDetailsImpl;
import com.teamSweProject.services.UsersService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsersService usersService;

    @Autowired
    UsersRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String role = userDetails.getAuthorities().toString();

        return ResponseEntity.ok(new JwtResponse(jwt,
                                                userDetails.getUserId(),
                                                userDetails.getUsername(),
                                                userDetails.getEmail(),
                                                role,
                                                userDetails.getFirstName(),
                                                userDetails.getLastName(),
                                                userDetails.getPhone(),
                                                userDetails.getDob()));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        Users user = usersService.createUser(
                                signUpRequest.getFirstName(),
                                signUpRequest.getLastName(),
                                signUpRequest.getEmail(),
                                signUpRequest.getPhone(),
                                signUpRequest.getDob(),
                                signUpRequest.getUsername(),
                                encoder.encode(signUpRequest.getPassword()),
                                Users.Role.ROLE_USER
                );

//        Users user = new Users(
//                                signUpRequest.getFirstName(),
//                                signUpRequest.getLastName(),
//                                signUpRequest.getEmail(),
//                                signUpRequest.getPhone(),
//                                signUpRequest.getDob(),
//                                signUpRequest.getUsername(),
//                                encoder.encode(signUpRequest.getPassword()),
//                                Users.Role.ROLE_USER
//                );

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }


}
