package com.gestion.citas.mapper;

import com.gestion.citas.model.dto.CitaDto;
import com.gestion.citas.model.entity.Cita;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CitaMapper {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    public CitaDto toDto(Cita entity) {
        if (entity == null) {
            return null;
        }

        CitaDto dto = new CitaDto();
        dto.setId(entity.getId());
        
        // Separar fecha y hora
        if (entity.getFecha() != null) {
            dto.setFecha(entity.getFecha().format(DATE_FORMATTER));
            dto.setHora(entity.getFecha().format(TIME_FORMATTER));
        }
        
        dto.setMotivo(entity.getMotivo());
        dto.setEstado(entity.getEstado());

        // Mapear doctor
        if (entity.getDoctor() != null) {
            CitaDto.DoctorInfo doctorInfo = new CitaDto.DoctorInfo();
            doctorInfo.setId(entity.getDoctor().getId());
            doctorInfo.setNombre(entity.getDoctor().getNombre());
            dto.setDoctor(doctorInfo);
        }

        // Mapear paciente
        if (entity.getPaciente() != null) {
            CitaDto.PacienteInfo pacienteInfo = new CitaDto.PacienteInfo();
            pacienteInfo.setId(entity.getPaciente().getId());
            pacienteInfo.setNombre(entity.getPaciente().getNombre());
            dto.setPaciente(pacienteInfo);
        }

        return dto;
    }

    public Cita toEntity(CitaDto dto) {
        if (dto == null) {
            return null;
        }

        Cita entity = new Cita();
        entity.setId(dto.getId());
        
        if (dto.getFecha() != null && dto.getHora() != null) {
            String fechaHora = dto.getFecha() + " " + dto.getHora();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            entity.setFecha(LocalDateTime.parse(fechaHora, formatter));
        }
        
        entity.setMotivo(dto.getMotivo());
        entity.setEstado(dto.getEstado());
        
        return entity;
    }

    public List<CitaDto> toDtoList(List<Cita> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}

