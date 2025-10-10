package com.gestion.citas.controller;

import com.gestion.citas.model.dto.DoctorDto;
import com.gestion.citas.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctores")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<DoctorDto> create(@Valid @RequestBody DoctorDto dto) {
        DoctorDto created = doctorService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDto> getById(@PathVariable Integer id) {
        DoctorDto dto = doctorService.findById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAll() {
        List<DoctorDto> list = doctorService.findAll();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDto> update(@PathVariable Integer id, @Valid @RequestBody DoctorDto dto) {
        DoctorDto updated = doctorService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        doctorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
