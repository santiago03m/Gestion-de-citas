package com.gestion.citas.mapper;

import com.gestion.citas.model.dto.CitaDto;
import com.gestion.citas.model.entity.Cita;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface CitaMapper {

    // entidad -> dto: extraemos los ids de paciente/doctor
    @Mapping(source = "paciente.id", target = "pacienteId")
    @Mapping(source = "doctor.id", target = "doctorId")
    CitaDto toDto(Cita entity);

    // dto -> entidad: ignoramos las asociaciones (las setea el service)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    Cita toEntity(CitaDto dto);

    // actualización parcial: ignoramos doctor/paciente (se gestionan en service)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "paciente", ignore = true)
    void updateFromDto(CitaDto dto, @MappingTarget Cita entity);
}

