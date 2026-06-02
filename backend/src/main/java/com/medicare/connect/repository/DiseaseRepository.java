package com.medicare.connect.repository;

import com.medicare.connect.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    @Query("SELECT d FROM Disease d WHERE LOWER(d.name) LIKE LOWER(concat('%', :query, '%'))")
    List<Disease> searchByName(@Param("query") String query);
}
