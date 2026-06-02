package com.medicare.connect.controller;

import com.medicare.connect.model.Consultation;
import com.medicare.connect.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR')")
    public Consultation createConsultation(@RequestBody Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    @GetMapping("/patient/{patientId}")
    public List<Consultation> getConsultationsByPatient(@PathVariable Long patientId) {
        return consultationRepository.findByPatientId(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Consultation> getConsultationsByDoctor(@PathVariable Long doctorId) {
        return consultationRepository.findByDoctorId(doctorId);
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('DOCTOR')")
    public Consultation completeConsultation(@PathVariable Long id, @RequestBody String diagnosis) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));
        consultation.setDiagnosis(diagnosis);
        consultation.setStatus(Consultation.ConsultationStatus.COMPLETED);
        return consultationRepository.save(consultation);
    }
}
