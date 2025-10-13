package com.gestion.citas;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@SpringBootApplication
public class CitasApplication {


    public static void main(String[] args) {
        Dotenv dotenv = null;
        String userDir = System.getProperty("user.dir");
        Path backendPath = Paths.get(userDir, "backend"); // apunta a .../Gestion de citas/backend

        try {
            if (Files.exists(backendPath.resolve(".env"))) {
                dotenv = Dotenv.configure()
                        .directory(backendPath.toString())
                        .load();
                System.out.println(".env cargado desde: " + backendPath);
            } else {
                System.out.println(".env no encontrado en: " + backendPath);
            }
        } catch (Exception e) {
            System.out.println("Error cargando .env: " + e.getMessage());
        }

        String jwt = Optional.ofNullable(dotenv != null ? dotenv.get("JWT_SECRET") : null)
                .orElseGet(() -> Optional.ofNullable(System.getenv("JWT_SECRET"))
                        .orElse(System.getProperty("JWT_SECRET")));

        System.out.println("JWT secret (antes setProperty): " + (jwt == null ? "NULL" : "*** oculto ***"));

        if (jwt != null) System.setProperty("JWT_SECRET", jwt);
        SpringApplication.run(CitasApplication.class, args);
    }

}
