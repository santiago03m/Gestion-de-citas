package com.gestion.citas.service.impl;

import com.gestion.citas.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.gestion.citas.repository.DoctorRepository;
import com.gestion.citas.mapper.DoctorMapper;
import com.gestion.citas.model.dto.DoctorDto;
import com.gestion.citas.model.entity.Doctor;
import com.gestion.citas.repository.UserRepository;
import com.gestion.citas.repository.RoleRepository;
import com.gestion.citas.model.entity.User;
import com.gestion.citas.model.entity.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repo;
    private final DoctorMapper mapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public DoctorDto create(DoctorDto dto) {
        Doctor entity = mapper.toEntity(dto);
        Doctor saved = repo.save(entity);
        // create user for doctor
        if (saved.getCorreo() != null) {
            if (userRepository.findByEmail(saved.getCorreo()).isPresent()) {
                throw new RuntimeException("User with email already exists");
            }

            Role role = roleRepository.findByName("DOCTOR").orElseThrow(() -> new RuntimeException("Role DOCTOR not found"));

            User user = User.builder()
                    .fullName(saved.getNombre())
                    .email(saved.getCorreo())
                    .password(passwordEncoder.encode(saved.getCorreo()))
                    .roles(Set.of(role))
                    .build();

            userRepository.save(user);
        }
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public DoctorDto findById(Integer id) {
        Doctor d = repo.findById(id).orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
        return mapper.toDto(d);
    }

    @Transactional(readOnly = true)
    public List<DoctorDto> findAll() {
        return repo.findAll().stream().map(mapper::toDto).toList();
    }

    @Transactional
    public DoctorDto update(Integer id, DoctorDto dto) {
        Doctor existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
        mapper.updateFromDto(dto, existing);
        Doctor saved = repo.save(existing);
        return mapper.toDto(saved);
    }

    @Transactional
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}