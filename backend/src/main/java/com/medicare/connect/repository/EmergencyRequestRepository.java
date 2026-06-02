package com.medicare.connect.repository;

import com.medicare.connect.model.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
    List<EmergencyRequest> findByPatientId(Long patientId);
    List<EmergencyRequest> findByStatus(EmergencyRequest.EmergencyStatus status);
}
