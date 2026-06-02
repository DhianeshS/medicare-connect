package com.medicare.connect.controller;

import com.medicare.connect.model.AuditLog;
import com.medicare.connect.model.Doctor;
import com.medicare.connect.model.Role;
import com.medicare.connect.repository.AuditLogRepository;
import com.medicare.connect.repository.DoctorRepository;
import com.medicare.connect.repository.RoleRepository;
import com.medicare.connect.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/doctors")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDoctorController {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    AuditLogRepository auditLogRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody Doctor doctor) {
        doctor.setPassword(encoder.encode(doctor.getPassword()));
        Role doctorRole = roleRepository.findByName(Role.RoleName.ROLE_DOCTOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        doctor.setRole(doctorRole);
        
        doctorRepository.save(doctor);
        
        String admin = SecurityContextHolder.getContext().getAuthentication().getName();
        auditLogRepository.save(new AuditLog("DOCTOR_CREATED", admin, "Created doctor: " + doctor.getFullName()));
        
        return ResponseEntity.ok("Doctor created successfully");
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<?> updateAvailability(@PathVariable Long id, @RequestBody String status) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        Doctor.AvailabilityStatus newStatus = Doctor.AvailabilityStatus.valueOf(status.replaceAll("\"", ""));
        Doctor.AvailabilityStatus oldStatus = doctor.getAvailabilityStatus();
        
        doctor.setAvailabilityStatus(newStatus);
        doctorRepository.save(doctor);

        String admin = SecurityContextHolder.getContext().getAuthentication().getName();
        auditLogRepository.save(new AuditLog("AVAILABILITY_CHANGED", admin, "Changed availability for " + doctor.getFullName() + " to " + newStatus));

        // If doctor becomes unavailable, trigger automatic rescheduling
        if ((newStatus == Doctor.AvailabilityStatus.ABSENT || newStatus == Doctor.AvailabilityStatus.ON_LEAVE) &&
            (oldStatus == Doctor.AvailabilityStatus.AVAILABLE || oldStatus == Doctor.AvailabilityStatus.LIMITED)) {
            appointmentService.rescheduleDoctorAppointments(id, LocalDate.now());
            auditLogRepository.save(new AuditLog("AUTO_RESCHEDULE", "SYSTEM", "Triggered rescheduling for doctor ID: " + id));
        }

        return ResponseEntity.ok("Availability updated and appointments rescheduled if necessary");
    }
}
