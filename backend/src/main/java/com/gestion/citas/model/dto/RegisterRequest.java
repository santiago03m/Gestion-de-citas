package com.gestion.citas.model.dto;

// roleName expected values: "PACIENTE","DOCTOR","ADMIN"
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String roleName; // optional, if null defaults to "PACIENTE"
    
    // Campos adicionales para pacientes
    private String documento;
    private String telefono;
}
