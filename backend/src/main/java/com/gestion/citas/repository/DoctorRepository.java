package com.gestion.citas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestion.citas.model.entity.Doctor;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findById(Integer id);
}
