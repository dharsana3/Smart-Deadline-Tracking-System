package com.sdts_backend.controller;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sdts_backend.dto.LoginRequest;
import com.sdts_backend.entity.User;
import com.sdts_backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) 
    {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User user) 
    {
    	try 
    	{
            User savedUser = userService.register(
                    user.getUsername(),
                    user.getEmail(),
                    user.getPasswordHash()
            );
            savedUser.setPasswordHash(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } 
    	catch (RuntimeException e) {
    	    return ResponseEntity.status(HttpStatus.CONFLICT)
    	            .body(e.getMessage());
    	}
    }
   
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) 
    {
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) 
        {
            return ResponseEntity.ok(optionalUser.get());
        } 
        else 
        {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest request)
    {
    	try
    	{
    		User user = userService.login(request.getEmail(), request.getPassword());
            user.setPasswordHash(null);
            return ResponseEntity.ok(user);
        }
        catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}