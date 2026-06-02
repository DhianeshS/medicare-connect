package com.medicare.connect.service;

import com.medicare.connect.model.Appointment;
import com.medicare.connect.model.Doctor;
import com.medicare.connect.model.Notification;
import com.medicare.connect.repository.AppointmentRepository;
import com.medicare.connect.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuditLogService auditLogService;

    @Transactional
    public void handleDoctorStatusChange(Long doctorId, Doctor.AvailabilityStatus newStatus) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setAvailabilityStatus(newStatus);
        doctorRepository.save(doctor);

        if (newStatus == Doctor.AvailabilityStatus.ABSENT || newStatus == Doctor.AvailabilityStatus.ON_LEAVE) {
            rescheduleAffectedAppointments(doctor);
        }

        auditLogService.logAction(
            "DOCTOR_STATUS_CHANGE",
            null, // Could be current user
            "Doctor",
            doctorId.toString(),
            "Doctor status changed to " + newStatus
        );
    }

    private void rescheduleAffectedAppointments(Doctor doctor) {
        // Find all booked or confirmed appointments for this doctor from today onwards
        List<Appointment> affectedAppointments = appointmentRepository.findByDoctorAndStatusIn(
                doctor, 
                List.of(Appointment.AppointmentStatus.BOOKED, Appointment.AppointmentStatus.CONFIRMED)
        );

        // Sort by date and time to preserve queue order
        affectedAppointments.sort(Comparator.comparing(Appointment::getAppointmentDate)
                .thenComparing(Appointment::getAppointmentTime));

        for (Appointment appt : affectedAppointments) {
            LocalDate nextDay = appt.getAppointmentDate().plusDays(1);
            // Simple logic: Move to next day, same time slot
            // In a production app, we'd check for slot availability and working hours
            
            appt.setAppointmentDate(nextDay);
            appt.setStatus(Appointment.AppointmentStatus.RESCHEDULED);
            appointmentRepository.save(appt);

            // Notify Patient
            notificationService.sendNotification(
                appt.getPatient(),
                "Appointment Rescheduled",
                "Your appointment with Dr. " + doctor.getLastName() + " has been moved to " + nextDay + " due to doctor unavailability.",
                Notification.NotificationType.APPOINTMENT
            );
        }
    }

    @Transactional
    public void rescheduleDoctorAppointments(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        List<Appointment> affectedAppointments = appointmentRepository.findByDoctorAndStatusIn(
                doctor, 
                List.of(Appointment.AppointmentStatus.BOOKED, Appointment.AppointmentStatus.CONFIRMED)
        );

        affectedAppointments.removeIf(appt -> appt.getAppointmentDate().isBefore(date));

        affectedAppointments.sort(Comparator.comparing(Appointment::getAppointmentDate)
                .thenComparing(Appointment::getAppointmentTime));

        for (Appointment appt : affectedAppointments) {
            LocalDate nextDay = appt.getAppointmentDate().plusDays(1);
            appt.setAppointmentDate(nextDay);
            appt.setStatus(Appointment.AppointmentStatus.RESCHEDULED);
            appointmentRepository.save(appt);

            notificationService.sendNotification(
                appt.getPatient(),
                "Appointment Rescheduled",
                "Your appointment with Dr. " + doctor.getLastName() + " has been moved to " + nextDay + " due to doctor unavailability.",
                Notification.NotificationType.APPOINTMENT
            );
        }
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
