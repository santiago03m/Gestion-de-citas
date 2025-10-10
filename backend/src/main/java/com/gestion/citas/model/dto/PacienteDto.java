package com.gestion.citas.model.dto;

import lombok.Data;
@Data
public class PacienteDto {
    private Integer id;
    private String nombre;
    private String documento;
    private String telefono;
    private String correo;
}