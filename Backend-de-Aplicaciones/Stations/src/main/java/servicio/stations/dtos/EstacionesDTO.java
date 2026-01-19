package servicio.stations.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class EstacionesDTO {

    private long id;
    private String nombre;
    private LocalDateTime fecha_hora_creacion;
    private double latitud;
    private double longitud;

}
