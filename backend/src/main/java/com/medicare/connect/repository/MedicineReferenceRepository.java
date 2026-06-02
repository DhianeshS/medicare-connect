package com.medicare.connect.repository;

import com.medicare.connect.model.MedicineReference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineReferenceRepository extends JpaRepository<MedicineReference, Long> {
}
