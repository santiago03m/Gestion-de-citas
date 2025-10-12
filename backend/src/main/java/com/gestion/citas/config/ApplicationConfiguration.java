package com.gestion.citas.config;

import com.gestion.citas.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.gestion.citas.repository.RoleRepository;
import com.gestion.citas.model.entity.Role;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@Configuration
public class ApplicationConfiguration {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Seed default roles on startup

    public ApplicationConfiguration(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @EventListener(ContextRefreshedEvent.class)
    public void seedRoles() {
        createRoleIfNotExists("PACIENTE");
        createRoleIfNotExists("DOCTOR");
        createRoleIfNotExists("ADMIN");
    }

    private void createRoleIfNotExists(String name) {
        roleRepository.findByName(name).orElseGet(() -> roleRepository.save(Role.builder().name(name).build()));
    }
}

