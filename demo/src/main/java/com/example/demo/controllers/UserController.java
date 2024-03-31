package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create a new user
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user != null) {
            User savedUser = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

   // User login
   @PostMapping("/login")
   public ResponseEntity<Object> loginUser(@RequestParam String username, @RequestParam String password) {
       Optional<User> userOptional = userRepository.findByUsername(username);
       if (userOptional.isPresent()) {
           User user = userOptional.get();
           if (user.getPasswordHash().equals(password)) {
               // Return user ID upon successful login
               return ResponseEntity.ok().body(user.getId());
           } else {
               return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
           }
       } else {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
       }
   }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
