package home.flast1k.system.controller;

import home.flast1k.system.helper.CustomErrorType;
import home.flast1k.system.model.User;
import home.flast1k.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/login")
    public Principal user(Principal user) {
        return user;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        if (userService.findByUsername(newUser.getUsername()) != null) {
            String errorMessage = String.format("User with username %s already exist", newUser.getUsername());
            CustomErrorType customErrorType = new CustomErrorType(errorMessage);
            return new ResponseEntity(customErrorType, HttpStatus.CONFLICT);
        }
        User currentUser = userService.save(new User(newUser.getUsername(), passwordEncoder.encode(newUser.getPassword())));
        return new ResponseEntity<>(currentUser, HttpStatus.CREATED);
    }
}