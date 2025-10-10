package com.gestion.citas.model.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CitaDto {
    private Integer id;
    private LocalDateTime fecha;
    private String motivo;
    private String estado;
    private Integer doctorId;
    private Integer pacienteId;
}

