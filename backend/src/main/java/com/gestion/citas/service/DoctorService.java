package com.gestion.citas.service;

import com.gestion.citas.model.dto.DoctorDto;
import java.util.List;

public interface DoctorService {
    DoctorDto create(DoctorDto dto);
    DoctorDto findById(Integer id);
    List<DoctorDto> findAll();
    DoctorDto update(Integer id, DoctorDto dto);
    void delete(Integer id);
}