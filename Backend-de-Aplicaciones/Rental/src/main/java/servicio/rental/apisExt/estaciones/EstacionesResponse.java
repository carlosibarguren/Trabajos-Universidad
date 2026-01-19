package servicio.rental.apisExt.estaciones;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EstacionesResponse {
    private long id;
    private String nombre;
    private LocalDateTime fecha_hora_creacion;
    private double latitud;
    private double longitud;
}

