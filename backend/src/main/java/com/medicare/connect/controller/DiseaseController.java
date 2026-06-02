package com.medicare.connect.controller;

import com.medicare.connect.model.Disease;
import com.medicare.connect.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    @Autowired
    private DiseaseRepository diseaseRepository;

    @GetMapping
    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Disease getDiseaseById(@PathVariable Long id) {
        return diseaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disease info not found"));
    }

    @GetMapping("/search")
    public List<Disease> searchDiseases(@RequestParam String query) {
        return diseaseRepository.searchByName(query);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Disease addDisease(@RequestBody Disease disease) {
        return diseaseRepository.save(disease);
    }
}
