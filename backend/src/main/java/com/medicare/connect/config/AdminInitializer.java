package com.medicare.connect.config;

import com.medicare.connect.model.*;
import com.medicare.connect.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private MedicineReferenceRepository medicineRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles
        for (Role.RoleName roleName : Role.RoleName.values()) {
            if (!roleRepository.findByName(roleName).isPresent()) {
                Role role = new Role();
                role.setName(roleName);
                roleRepository.save(role);
            }
        }

        // Initialize Admin
        String adminEmail = "admin@medicareconnect.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(encoder.encode("Admin@123"));
            admin.setFirstName("Hospital");
            admin.setLastName("Controller");
            Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN).get();
            admin.setRole(adminRole);
            userRepository.save(admin);
        }

        // Initialize Medicines
        if (medicineRepository.count() == 0) {
            seedMedicines();
        }

        // Initialize Diseases
        if (diseaseRepository.count() == 0) {
            seedDiseases();
        }

        // Initialize Indian Doctor Profiles
        if (doctorRepository.count() <= 3) { // Seed if only default doctors exist
            seedIndianDoctors();
        }

        // Initialize Sample Patient Data
        if (patientRepository.count() == 0) {
            seedSamplePatients();
        }
    }

    private void seedMedicines() {
        MedicineReference paracetamol = new MedicineReference("Paracetamol", "Tablet", "Used to treat fever and pain", "Rash, Nausea", "Do not exceed 4g per day", false);
        MedicineReference cetirizine = new MedicineReference("Cetirizine", "Tablet", "Used for allergic conditions", "Drowsiness, Dry mouth", "Avoid alcohol", false);
        MedicineReference ibuprofen = new MedicineReference("Ibuprofen", "Tablet", "Treats pain and inflammation", "Stomach ache, Nausea", "Take with food", true);
        MedicineReference ors = new MedicineReference("ORS", "Powder", "Rehydration during diarrhea", "Rare", "Mix with clean water", false);
        MedicineReference amlodipine = new MedicineReference("Amlodipine", "Tablet", "Treats high blood pressure", "Dizziness, swollen ankles", "Take at the same time each day", true);
        MedicineReference metformin = new MedicineReference("Metformin", "Tablet", "Treats Type 2 Diabetes", "Nausea, stomach upset", "Take with meals", true);
        
        medicineRepository.saveAll(Arrays.asList(paracetamol, cetirizine, ibuprofen, ors, amlodipine, metformin));
    }

    private void seedDiseases() {
        MedicineReference paracetamol = medicineRepository.findAll().stream().filter(m -> m.getName().equals("Paracetamol")).findFirst().get();
        MedicineReference cetirizine = medicineRepository.findAll().stream().filter(m -> m.getName().equals("Cetirizine")).findFirst().get();
        MedicineReference ibuprofen = medicineRepository.findAll().stream().filter(m -> m.getName().equals("Ibuprofen")).findFirst().get();
        MedicineReference ors = medicineRepository.findAll().stream().filter(m -> m.getName().equals("ORS")).findFirst().get();

        Disease fever = new Disease("Fever", "High temperature, body pain, chills", "Infections, excessive heat", "Drink fluids, rest, monitor temp", "Maintain hygiene, stay hydrated", "If temp > 103F or lasts 3+ days", "General Physician", Arrays.asList("High temperature", "Body pain", "Chills", "Weakness"), Arrays.asList(paracetamol));
        Disease cold = new Disease("Common Cold", "Sneezing, runny nose, mild fever", "Rhinoviruses", "Warm fluids, rest, steam inhalation", "Wash hands, avoid infected persons", "Persistent fever or difficulty breathing", "General Physician", Arrays.asList("Sneezing", "Runny nose", "Congestion"), Arrays.asList(paracetamol, cetirizine));
        Disease diarrhea = new Disease("Diarrhea", "Frequent loose stools, stomach cramps", "Contaminated food/water", "ORS, drink plenty of water", "Eat clean food, wash hands", "Severe dehydration or bloody stools", "Gastroenterologist", Arrays.asList("Loose stools", "Cramps", "Thirst"), Arrays.asList(ors));

        diseaseRepository.saveAll(Arrays.asList(fever, cold, diarrhea));
    }

    private void seedIndianDoctors() {
        Role doctorRole = roleRepository.findByName(Role.RoleName.ROLE_DOCTOR).get();
        
        Object[][] doctorData = {
            {"Arjun", "Sharma", "arjun@medicare.com", "Cardiology", "MD, DM", 12, 800.0, "H-12, Green Park, Delhi", "Mon-Fri: 09:00-14:00"},
            {"Priya", "Nair", "priya@medicare.com", "Dermatology", "MD", 8, 500.0, "Suite 402, Apollo Clinics, Bangalore", "Tue-Sat: 10:00-18:00"},
            {"Rahul", "Verma", "rahul@medicare.com", "General Medicine", "MBBS, MD", 10, 400.0, "City Health Center, Mumbai", "Daily: 08:00-20:00"},
            {"Ananya", "Iyer", "ananya@medicare.com", "Pediatrics", "MD", 7, 450.0, "KiddieCare Hospital, Chennai", "Mon-Sat: 09:00-15:00"},
            {"Vikram", "Reddy", "vikram@medicare.com", "Orthopedic Surgeon", "MS, MCh", 15, 1000.0, "Reddy Ortho Institute, Hyderabad", "Mon-Wed: 16:00-20:00"},
            {"Meera", "Krishnan", "meera@medicare.com", "Gynecology", "MD, DGO", 11, 600.0, "Motherhood Clinic, Kochi", "Tue-Fri: 11:00-17:00"},
            {"Karthik", "Narayanan", "karthik@medicare.com", "Neurology", "MD, DM", 13, 900.0, "NeuroLife Hospital, Chennai", "Mon-Sat: 09:00-13:00"},
            {"Sneha", "Patel", "sneha@medicare.com", "ENT Specialist", "MS", 9, 550.0, "Patel ENT Care, Ahmedabad", "Daily: 11:00-19:00"},
            {"Amit", "Desai", "amit@medicare.com", "Oncology", "MD, DM", 14, 1200.0, "Global Cancer Center, Mumbai", "Tue-Sat: 08:00-16:00"},
            {"Shweta", "Gupta", "shweta@medicare.com", "Endocrinology", "MD, DNB", 10, 750.0, "Hormone Health Center, Delhi", "Mon-Fri: 14:00-19:00"}
        };

        for (Object[] data : doctorData) {
            if (!userRepository.existsByEmail((String)data[2])) {
                Doctor d = new Doctor();
                d.setFirstName((String)data[0]);
                d.setLastName((String)data[1]);
                d.setEmail((String)data[2]);
                d.setPassword(encoder.encode("Doctor@123"));
                d.setRole(doctorRole);
                d.setSpecialization((String)data[3]);
                d.setQualification((String)data[4]);
                d.setExperienceYears((Integer)data[5]);
                d.setConsultationFee((Double)data[6]);
                d.setClinicAddress((String)data[7]);
                d.setAvailableWorkingHours((String)data[8]);
                d.setAvailabilityStatus(Doctor.AvailabilityStatus.AVAILABLE);
                doctorRepository.save(d);
            }
        }
    }

    private void seedSamplePatients() {
        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT).get();

        String[][] patientData = {
            {"Ramesh", "Kumar", "ramesh@test.com", "45", "Male", "A+"},
            {"Lakshmi", "Devi", "lakshmi@test.com", "32", "Female", "O+"},
            {"Suresh", "Raj", "suresh@test.com", "58", "Male", "B+"},
            {"Anita", "Sharma", "anita@test.com", "28", "Female", "AB+"},
            {"Kiran", "Reddy", "kiran@test.com", "35", "Male", "A+"},
            {"Priya", "Menon", "priyam@test.com", "40", "Female", "O-"}
        };

        for (String[] data : patientData) {
            Patient p = new Patient();
            p.setFirstName(data[0]);
            p.setLastName(data[1]);
            p.setEmail(data[2]);
            p.setPassword(encoder.encode("Patient@123"));
            p.setRole(patientRole);
            p.setGender(data[4]);
            p.setBloodGroup(data[5]);
            p.setStatus(Patient.PatientStatus.ONLINE);
            p.setLastLoginTime(LocalDateTime.now().minusHours((int)(Math.random() * 24)));
            p.setLastActivity(LocalDateTime.now());
            patientRepository.save(p);
        }
    }
}
