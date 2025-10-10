package com.gestion.citas.service.impl;

import com.gestion.citas.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.gestion.citas.repository.DoctorRepository;
import com.gestion.citas.mapper.DoctorMapper;
import com.gestion.citas.model.dto.DoctorDto;
import com.gestion.citas.model.entity.Doctor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repo;
    private final DoctorMapper mapper;

    @Transactional
    public DoctorDto create(DoctorDto dto) {
        Doctor entity = mapper.toEntity(dto);
        Doctor saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public DoctorDto findById(Integer id) {
        Doctor d = repo.findById(id).orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
        return mapper.toDto(d);
    }

    @Transactional(readOnly = true)
    public List<DoctorDto> findAll() {
        return repo.findAll().stream().map(mapper::toDto).toList();
    }

    @Transactional
    public DoctorDto update(Integer id, DoctorDto dto) {
        Doctor existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
        mapper.updateFromDto(dto, existing);
        Doctor saved = repo.save(existing);
        return mapper.toDto(saved);
    }

    @Transactional
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}