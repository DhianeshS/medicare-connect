package com.medicare.connect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "emergency_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class EmergencyRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(nullable = false)
    private String emergencyType;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private EmergencyStatus status = EmergencyStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String description;

    public enum EmergencyStatus {
        PENDING, DISPATCHED, RESOLVED, CANCELLED
    }
}
