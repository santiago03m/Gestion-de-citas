package com.gestion.citas.service.impl;

import com.gestion.citas.mapper.PacienteMapper;
import com.gestion.citas.model.dto.PacienteDto;
import com.gestion.citas.model.entity.Paciente;
import com.gestion.citas.repository.PacienteRepository;
import com.gestion.citas.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import com.gestion.citas.repository.UserRepository;
import com.gestion.citas.repository.RoleRepository;
import com.gestion.citas.model.entity.User;
import com.gestion.citas.model.entity.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository repo;
    private final PacienteMapper mapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public PacienteDto create(PacienteDto dto) {
        Paciente entity = mapper.toEntity(dto);
        Paciente saved = repo.save(entity);

        // create associated User
        if (saved.getCorreo() != null) {
            if (userRepository.findByEmail(saved.getCorreo()).isPresent()) {
                throw new RuntimeException("User with email already exists");
            }

            Role role = roleRepository.findByName("PACIENTE").orElseThrow(() -> new RuntimeException("Role PACIENTE not found"));

            User user = User.builder()
                    .fullName(saved.getNombre())
                    .email(saved.getCorreo())
                    .password(passwordEncoder.encode(saved.getDocumento()))
                    .roles(Set.of(role))
                    .build();

            userRepository.save(user);
        }
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public PacienteDto findById(Integer id){
        Paciente p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        return mapper.toDto(p);
    }

    @Transactional
    public PacienteDto update(Integer id, PacienteDto dto) {
        Paciente existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        mapper.updateFromDto(dto, existing);
        Paciente saved = repo.save(existing);
        return mapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<PacienteDto> findAll() {
        return repo.findAll().stream().map(mapper::toDto).toList();
    }

    @Override
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}