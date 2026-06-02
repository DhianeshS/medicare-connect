package com.medicare.connect.repository;

import com.medicare.connect.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Collection;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByStatusIn(Collection<Patient.PatientStatus> statuses);
    Optional<Patient> findByEmail(String email);
}
