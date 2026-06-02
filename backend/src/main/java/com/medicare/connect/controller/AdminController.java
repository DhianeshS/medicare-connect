package com.medicare.connect.controller;

import com.medicare.connect.dto.MessageResponse;
import com.medicare.connect.dto.SignupRequest;
import com.medicare.connect.model.Patient;
import com.medicare.connect.model.Role;
import com.medicare.connect.repository.RoleRepository;
import com.medicare.connect.repository.UserRepository;
import com.medicare.connect.repository.PatientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Arrays;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    PatientRepository patientRepository;

    @PostMapping("/create-patient")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPatient(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Patient patient = new Patient();
        patient.setEmail(signUpRequest.getEmail());
        patient.setPassword(encoder.encode(signUpRequest.getPassword()));
        patient.setFirstName(signUpRequest.getFirstName());
        patient.setLastName(signUpRequest.getLastName());
        patient.setPhone(signUpRequest.getPhone());

        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        patient.setRole(patientRole);

        userRepository.save(patient);

        return ResponseEntity.ok(new MessageResponse("Patient account created successfully by Admin!"));
    }

    @GetMapping("/active-patients")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Patient> getActivePatients() {
        return patientRepository.findByStatusIn(Arrays.asList(Patient.PatientStatus.ONLINE, Patient.PatientStatus.IDLE));
    }
}
