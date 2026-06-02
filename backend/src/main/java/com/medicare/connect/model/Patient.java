package com.medicare.connect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@PrimaryKeyJoinColumn(name = "id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Patient extends User {
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String address;
    private String emergencyContactName;
    private String emergencyContactPhone;

    // Medical Information
    @Column(columnDefinition = "TEXT")
    private String allergies;
    @Column(columnDefinition = "TEXT")
    private String chronicConditions;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalHistory> medicalHistories = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalReport> medicalReports = new ArrayList<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<FamilyMember> familyMembers = new ArrayList<>();
    @Enumerated(EnumType.STRING)
    private PatientStatus status = PatientStatus.OFFLINE;
    private java.time.LocalDateTime lastActivity;
    private java.time.LocalDateTime lastLoginTime;

    public enum PatientStatus {
        ONLINE, IDLE, OFFLINE
    }
}
