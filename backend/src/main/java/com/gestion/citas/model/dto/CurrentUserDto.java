package com.gestion.citas.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrentUserDto {
    private Integer id;
    private String fullName;
    private String email;
    private List<String> roles;
    
    // ID asociado según el rol
    private Integer pacienteId;
    private Integer doctorId;
}
