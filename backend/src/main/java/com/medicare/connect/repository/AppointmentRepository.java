package com.medicare.connect.repository;

import com.medicare.connect.model.Appointment;
import com.medicare.connect.model.Doctor;
import com.medicare.connect.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByDoctorAndAppointmentDate(Doctor doctor, LocalDate appointmentDate);
    List<Appointment> findByDoctorAndAppointmentDateAndStatusIn(Doctor doctor, LocalDate appointmentDate, List<Appointment.AppointmentStatus> statuses);
    List<Appointment> findByDoctorAndStatusIn(Doctor doctor, List<Appointment.AppointmentStatus> statuses);
}
