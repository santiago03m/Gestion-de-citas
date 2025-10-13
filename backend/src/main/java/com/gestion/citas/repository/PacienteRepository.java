package com.gestion.citas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestion.citas.model.entity.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
}
