package com.gestion.citas.service;

import com.gestion.citas.model.dto.CitaDto;
import java.util.List;

public interface CitaService {
    CitaDto create(CitaDto dto);
    CitaDto findById(Integer id);
    List<CitaDto> findAll();
    CitaDto update(Integer id, CitaDto dto);
    void delete(Integer id);

    List<CitaDto> findByDoctorId(Integer doctorId);
    List<CitaDto> findByPacienteId(Integer pacienteId);
}
