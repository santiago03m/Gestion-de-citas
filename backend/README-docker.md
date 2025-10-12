# Docker Compose para la base de datos

Este `docker-compose.yml` levanta:

- PostgreSQL (puerto 5432)
- pgAdmin (puerto 5050)

Archivos:
- `docker-compose.yml` - compose para DB y pgAdmin
- `.env` - variables de entorno (usuario/contraseña)

Cómo usar:

1. Desde la carpeta `backend` ejecutar:

```powershell
docker compose up -d
```

2. Verificar contenedores:

```powershell
docker compose ps
```

3. Abrir pgAdmin en http://localhost:5050 con las credenciales de `.env`.
   - Añadir un Server en pgAdmin con:
     - Host: `db` (nombre del servicio en compose)
     - Port: `5432`
     - Maintenance DB: `${POSTGRES_DB}`
     - Username: `${POSTGRES_USER}`
     - Password: `${POSTGRES_PASSWORD}`

4. En la aplicación Spring Boot (`application.properties`) puedes usar las variables de entorno que ya están configuradas:

```
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:citasdb}
```

Notas:
- Usa `docker compose down -v` para bajar los servicios y borrar volúmenes si necesitas reiniciar la DB.
- No guardes credenciales sensibles en el repo en producción; usa secret manager o variable de entorno.
