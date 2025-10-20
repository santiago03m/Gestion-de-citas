package com.gestion.citas.controller;

import com.gestion.citas.model.dto.AuthenticationRequest;
import com.gestion.citas.model.dto.AuthenticationResponse;
import com.gestion.citas.model.dto.RegisterRequest;
import com.gestion.citas.model.entity.Paciente;
import com.gestion.citas.model.entity.Role;
import com.gestion.citas.model.entity.User;
import com.gestion.citas.repository.PacienteRepository;
import com.gestion.citas.repository.RoleRepository;
import com.gestion.citas.repository.UserRepository;
import com.gestion.citas.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final PacienteRepository pacienteRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserDetailsService userDetailsService,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          RoleRepository roleRepository,
                          PacienteRepository pacienteRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        Set<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        AuthenticationResponse response = AuthenticationResponse.builder()
                .accessToken(token)
                .expiresIn(jwtService.getExpirationTime())
                .email(userDetails.getUsername())
                .roles(roles)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        String roleName = request.getRoleName() == null ? "PACIENTE" : request.getRoleName().toUpperCase();
        Role role = roleRepository.findByName(roleName).orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));

        // Si es un paciente y se proporcionan datos adicionales, crear el registro de paciente
        if ("PACIENTE".equals(roleName) && request.getDocumento() != null) {
            // Verificar si el documento ya existe
            if (pacienteRepository.findByDocumento(request.getDocumento()).isPresent()) {
                return ResponseEntity.badRequest().build();
            }

            Paciente paciente = Paciente.builder()
                    .nombre(request.getFullName())
                    .documento(request.getDocumento())
                    .telefono(request.getTelefono())
                    .correo(request.getEmail())
                    .build();

            pacienteRepository.save(paciente);
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(role))
                .build();

        userRepository.save(user);

        // after registration, auto authenticate and return token
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        Set<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        AuthenticationResponse response = AuthenticationResponse.builder()
                .accessToken(token)
                .expiresIn(jwtService.getExpirationTime())
                .email(userDetails.getUsername())
                .roles(roles)
                .build();

        return ResponseEntity.ok(response);
    }
}
