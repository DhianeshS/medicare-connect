package com.medicare.connect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicine_references")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MedicineReference extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    private String type; // Tablet, Syrup, etc.

    @Column(columnDefinition = "TEXT")
    private String commonUses;

    @Column(columnDefinition = "TEXT")
    private String sideEffects;

    @Column(columnDefinition = "TEXT")
    private String precautions;

    private boolean prescriptionRequired;
}
