package com.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.entities.Users;
import com.entities.Users.Role;
import com.repositories.UsersRepository;

@Service
public class UsersService {

    private final UsersRepository userRepository; 
    private final static Logger logger = LoggerFactory.getLogger(UsersService.class);

    public UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    // get all users
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // get user by its id
    public Users findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // create a user
    public Users createUser(String firstName, String lastName, String email, String phone, 
        LocalDate dateOfBirth, String username, String password, Role role) {

        if (role == null) {
            role = Role.USER;
        }
        Users user = new Users(firstName, lastName, email, 
            phone, dateOfBirth, username, password, role);

        return userRepository.save(user);
    }

    // delete user by its id
    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            logger.error("Failed to delete user", e);
            return false; 
        }
    }
    
}
