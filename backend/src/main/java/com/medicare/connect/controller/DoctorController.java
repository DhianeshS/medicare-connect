package com.medicare.connect.controller;

import com.medicare.connect.model.Doctor;
import com.medicare.connect.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getBySpecialization(@PathVariable String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        doctor.setFirstName(doctorDetails.getFirstName());
        doctor.setLastName(doctorDetails.getLastName());
        doctor.setQualification(doctorDetails.getQualification());
        doctor.setSpecialization(doctorDetails.getSpecialization());
        doctor.setExperienceYears(doctorDetails.getExperienceYears());
        doctor.setConsultationFee(doctorDetails.getConsultationFee());
        doctor.setClinicAddress(doctorDetails.getClinicAddress());
        doctor.setClinicPhone(doctorDetails.getClinicPhone());
        doctor.setAvailableWorkingHours(doctorDetails.getAvailableWorkingHours());
        doctor.setAvailabilityStatus(doctorDetails.getAvailabilityStatus());
        
        return doctorRepository.save(doctor);
    }
}
