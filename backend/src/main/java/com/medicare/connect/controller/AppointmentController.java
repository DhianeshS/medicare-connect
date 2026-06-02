package com.medicare.connect.controller;

import com.medicare.connect.model.Appointment;
import com.medicare.connect.model.Doctor;
import com.medicare.connect.model.Patient;
import com.medicare.connect.model.User;
import com.medicare.connect.repository.AppointmentRepository;
import com.medicare.connect.repository.DoctorRepository;
import com.medicare.connect.repository.PatientRepository;
import com.medicare.connect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Appointment> getAppointments() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().getName() == com.medicare.connect.model.Role.RoleName.ROLE_PATIENT) {
            Patient patient = patientRepository.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("Patient profile not found"));
            return appointmentRepository.findByPatient(patient);
        } else if (user.getRole().getName() == com.medicare.connect.model.Role.RoleName.ROLE_DOCTOR) {
            Doctor doctor = doctorRepository.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
            return appointmentRepository.findByDoctor(doctor);
        } else {
            return appointmentRepository.findAll();
        }
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> requestData) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

        Long doctorId = Long.valueOf(requestData.get("doctorId").toString());
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        String dateStr = requestData.get("appointmentDate").toString();
        LocalDate date = LocalDate.parse(dateStr);

        String timeStr = requestData.get("appointmentTime").toString();
        LocalTime time;
        try {
            time = LocalTime.parse(timeStr, DateTimeFormatter.ofPattern("hh:mm a"));
        } catch (Exception e) {
            time = LocalTime.parse(timeStr);
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(date);
        appointment.setAppointmentTime(time);
        appointment.setStatus(Appointment.AppointmentStatus.BOOKED);
        appointment.setReason(requestData.containsKey("reason") ? requestData.get("reason").toString() : "Routine Checkup");

        appointmentRepository.save(appointment);

        return ResponseEntity.ok(Map.of(
                "message", "Appointment booked successfully!",
                "appointmentId", appointment.getId()
        ));
    }
}
