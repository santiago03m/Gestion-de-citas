package com.gestion.citas.service.impl;

import com.gestion.citas.exceptions.ResourceNotFoundException;
import com.gestion.citas.mapper.CitaMapper;
import com.gestion.citas.model.dto.CitaDto;
import com.gestion.citas.model.entity.Cita;
import com.gestion.citas.model.entity.Doctor;
import com.gestion.citas.model.entity.Paciente;
import com.gestion.citas.repository.CitaRepository;
import com.gestion.citas.repository.DoctorRepository;
import com.gestion.citas.repository.PacienteRepository;
import com.gestion.citas.service.CitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final DoctorRepository doctorRepository;
    private final PacienteRepository pacienteRepository;
    private final CitaMapper citaMapper;

    @Transactional
    @Override
    public CitaDto create(CitaDto dto) {
        Integer doctorId = dto.getDoctorId();
        Integer pacienteId = dto.getPacienteId();

        if (doctorId == null || pacienteId == null) {
            throw new IllegalArgumentException("Doctor id y Paciente id son obligatorios en CitaDto");
        }

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor no encontrado con id: " + doctorId));
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + pacienteId));

        Cita entity = citaMapper.toEntity(dto); // doctor/paciente null aquí
        entity.setDoctor(doctor);
        entity.setPaciente(paciente);

        if (entity.getEstado() == null) entity.setEstado("Pendiente");

        Cita saved = citaRepository.save(entity);
        return citaMapper.toDto(saved);
    }


    @Transactional(readOnly = true)
    @Override
    public CitaDto findById(Integer id) {
        Cita c = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con id: " + id));
        return citaMapper.toDto(c);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaDto> findAll() {
        return citaRepository.findAll().stream().map(citaMapper::toDto).toList();
    }

    @Transactional
    @Override
    public CitaDto update(Integer id, CitaDto dto) {
        Cita existing = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con id: " + id));

        // Actualizar campos simples
        if (dto.getFecha() != null && dto.getHora() != null) {
            String fechaHora = dto.getFecha() + " " + dto.getHora();
            java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            existing.setFecha(java.time.LocalDateTime.parse(fechaHora, formatter));
        }
        
        if (dto.getMotivo() != null) {
            existing.setMotivo(dto.getMotivo());
        }
        
        if (dto.getEstado() != null) {
            existing.setEstado(dto.getEstado());
        }

        Integer doctorId = dto.getDoctorId();
        Integer pacienteId = dto.getPacienteId();

        if (doctorId != null) {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor no encontrado con id: " + doctorId));
            existing.setDoctor(doctor);
        }

        if (pacienteId != null) {
            Paciente paciente = pacienteRepository.findById(pacienteId)
                    .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con id: " + pacienteId));
            existing.setPaciente(paciente);
        }

        Cita saved = citaRepository.save(existing);
        return citaMapper.toDto(saved);
    }


    @Transactional
    @Override
    public void delete(Integer id) {
        if (!citaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cita no encontrada con id: " + id);
        }
        citaRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaDto> findByDoctorId(Integer doctorId) {
        return citaRepository.findByDoctorId(doctorId).stream().map(citaMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<CitaDto> findByPacienteId(Integer pacienteId) {
        return citaRepository.findByPacienteId(pacienteId).stream().map(citaMapper::toDto).toList();
    }
}
