package com.gestion.citas.controller;

import com.gestion.citas.model.dto.CitaDto;
import com.gestion.citas.service.CitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
public class CitaController {

    private final CitaService citaService;

    @PostMapping
    public ResponseEntity<CitaDto> create(@Valid @RequestBody CitaDto dto) {
        CitaDto created = citaService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(citaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<CitaDto>> getAll() {
        return ResponseEntity.ok(citaService.findAll());
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<CitaDto>> getByDoctor(@PathVariable Integer doctorId) {
        return ResponseEntity.ok(citaService.findByDoctorId(doctorId));
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<CitaDto>> getByPaciente(@PathVariable Integer pacienteId) {
        return ResponseEntity.ok(citaService.findByPacienteId(pacienteId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        citaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
