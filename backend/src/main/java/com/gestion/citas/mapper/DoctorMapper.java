package com.gestion.citas.mapper;

import com.gestion.citas.model.dto.DoctorDto;
import com.gestion.citas.model.entity.Doctor;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface DoctorMapper {

    // Entidad -> DTO
    DoctorDto toDto(Doctor entity);

    // DTO -> Entidad
    @Mapping(target = "citas", ignore = true)
    Doctor toEntity(DoctorDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "citas", ignore = true)
    void updateFromDto(DoctorDto dto, @MappingTarget Doctor entity);
}
