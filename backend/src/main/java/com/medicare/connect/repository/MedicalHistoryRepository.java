package com.medicare.connect.repository;

import com.medicare.connect.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {
    List<MedicalHistory> findByPatientIdAndIsDeletedFalse(Long patientId);
}
