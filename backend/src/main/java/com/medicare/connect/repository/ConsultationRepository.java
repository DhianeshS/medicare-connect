package com.medicare.connect.repository;

import com.medicare.connect.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPatientId(Long patientId);
    List<Consultation> findByDoctorId(Long doctorId);
}
