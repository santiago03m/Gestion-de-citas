package com.gestion.citas.service;

import com.gestion.citas.model.dto.PacienteDto;
import java.util.List;

public interface PacienteService {
    PacienteDto create(PacienteDto dto);
    PacienteDto findById(Integer id);
    PacienteDto update(Integer id, PacienteDto dto);
    List<PacienteDto> findAll();
    void delete(Integer id);
}
