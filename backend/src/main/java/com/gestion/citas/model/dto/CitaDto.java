package com.gestion.citas.model.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CitaDto {
    private Integer id;
    private String fecha;  // Formato: "2024-01-15"
    private String hora;   // Formato: "14:30"
    private String motivo;
    private String estado;
    
    // Para recibir datos (crear/actualizar citas)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer doctorId;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Integer pacienteId;
    
    // Para enviar datos (respuestas GET)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private DoctorInfo doctor;
    
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private PacienteInfo paciente;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DoctorInfo {
        private Integer id;
        private String nombre;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PacienteInfo {
        private Integer id;
        private String nombre;
    }
}

