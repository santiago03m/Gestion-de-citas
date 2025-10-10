package com.gestion.citas.controller;

import com.gestion.citas.model.dto.PacienteDto;
import com.gestion.citas.service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteDto> create(@Valid @RequestBody PacienteDto dto) {
        PacienteDto created = pacienteService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(pacienteService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<PacienteDto>> getAll() {
        return ResponseEntity.ok(pacienteService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteDto> update(@PathVariable Integer id, @Valid @RequestBody PacienteDto dto) {
        return ResponseEntity.ok(pacienteService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        pacienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
