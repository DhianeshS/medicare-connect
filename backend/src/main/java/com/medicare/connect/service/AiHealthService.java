package com.medicare.connect.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AiHealthService {

    @Data
    @AllArgsConstructor
    public static class SymptomDiagnosis {
        private String condition;
        private String severity;
        private String specialist;
        private List<String> commonSymptoms;
    }

    private final List<SymptomDiagnosis> knowledgeBase = new ArrayList<>();

    public AiHealthService() {
        knowledgeBase.add(new SymptomDiagnosis("Common Cold", "Low", "General Physician", 
                List.of("cough", "sneeze", "fever", "runny nose")));
        knowledgeBase.add(new SymptomDiagnosis("Influenza (Flu)", "Medium", "General Physician", 
                List.of("high fever", "body ache", "fatigue", "cough")));
        knowledgeBase.add(new SymptomDiagnosis("Hypertension", "Medium", "Cardiologist", 
                List.of("headache", "shortness of breath", "nosebleed")));
        knowledgeBase.add(new SymptomDiagnosis("Migraine", "Medium", "Neurologist", 
                List.of("intense headache", "nausea", "sensitivity to light")));
    }

    public List<SymptomDiagnosis> checkSymptoms(List<String> symptoms) {
        List<String> inputSymptoms = symptoms.stream().map(String::toLowerCase).collect(Collectors.toList());
        
        return knowledgeBase.stream()
                .filter(d -> d.getCommonSymptoms().stream().anyMatch(inputSymptoms::contains))
                .collect(Collectors.toList());
    }
}
