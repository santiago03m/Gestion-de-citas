package com.gestion.citas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestion.citas.model.entity.Cita;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Integer> {
    List<Cita> findByDoctorId(Integer doctorId);
    List<Cita> findByPacienteId(Integer pacienteId);
}
