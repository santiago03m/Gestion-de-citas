package com.gestion.citas.mapper;

import com.gestion.citas.model.dto.PacienteDto;
import com.gestion.citas.model.entity.Paciente;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PacienteMapper {

    // Entidad -> DTO
    PacienteDto toDto(Paciente entity);

    // DTO -> Entidad
    Paciente toEntity(PacienteDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "citas", ignore = true)
    void updateFromDto(PacienteDto dto, @MappingTarget Paciente entity);
}
