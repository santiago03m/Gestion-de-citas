package com.gestion.citas.model.dto;

import lombok.Data;

@Data
public class DoctorDto {
    private Integer id;
    private String nombre;
    private String especialidad;
    private String telefono;
    private String correo;
}