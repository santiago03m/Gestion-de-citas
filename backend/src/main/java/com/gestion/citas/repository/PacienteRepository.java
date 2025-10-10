package com.gestion.citas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestion.citas.model.entity.Paciente;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    Optional<Paciente> findById(Integer id);
}
