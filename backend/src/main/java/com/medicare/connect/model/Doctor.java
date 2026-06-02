package com.medicare.connect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@PrimaryKeyJoinColumn(name = "id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Doctor extends User {
    private String specialization;
    private String qualification;
    private Integer experienceYears;
    
    @Enumerated(EnumType.STRING)
    private AvailabilityStatus availabilityStatus = AvailabilityStatus.AVAILABLE;
    
    private Double consultationFee;
    
    @Column(columnDefinition = "TEXT")
    private String bio;

    private String clinicAddress;
    private String clinicPhone;
    private String availableWorkingHours; // e.g., "Mon-Fri: 09:00-17:00"
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();

    public enum AvailabilityStatus {
        AVAILABLE, LIMITED, ABSENT, ON_LEAVE
    }
}
