package com.medicare.connect.controller;

import com.medicare.connect.dto.JwtResponse;
import com.medicare.connect.dto.LoginRequest;
import com.medicare.connect.dto.MessageResponse;
import com.medicare.connect.dto.SignupRequest;
import com.medicare.connect.model.Patient;
import com.medicare.connect.model.Role;
import com.medicare.connect.repository.RoleRepository;
import com.medicare.connect.repository.UserRepository;
import com.medicare.connect.security.JwtUtils;
import com.medicare.connect.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new JwtResponse(jwt, 
                                 userDetails.getId(), 
                                 userDetails.getUsername(), 
                                 userDetails.getFirstName(), 
                                 userDetails.getLastName(), 
                                 role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new patient account (all registrations are patients by default)
        Patient user = new Patient();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhone(signUpRequest.getPhone());

        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRole(patientRole);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new MessageResponse("You've been signed out!"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        // Logic for forgot password would go here
        return ResponseEntity.ok(new MessageResponse("If your email is registered, you will receive a reset link."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        // Logic for reset password would go here
        return ResponseEntity.ok(new MessageResponse("Password has been reset successfully."));
    }
}
