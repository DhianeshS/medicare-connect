package com.medicare.connect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "diseases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Disease extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(columnDefinition = "TEXT")
    private String causes;

    @Column(columnDefinition = "TEXT")
    private String firstAidMeasures;

    @Column(columnDefinition = "TEXT")
    private String preventionTips;

    @Column(columnDefinition = "TEXT")
    private String whenToVisitDoctor;

    private String specialistType; // e.g., "General Physician"

    @ElementCollection
    @CollectionTable(name = "disease_symptoms", joinColumns = @JoinColumn(name = "disease_id"))
    @Column(name = "symptom")
    private List<String> symptoms = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "disease_medicines",
        joinColumns = @JoinColumn(name = "disease_id"),
        inverseJoinColumns = @JoinColumn(name = "medicine_id")
    )
    private List<MedicineReference> commonlyPrescribedMedicines = new ArrayList<>();
}
