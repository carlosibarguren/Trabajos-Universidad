package servicio.rental.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AlquileresDTO {
    private long id;
    private String id_cliente;
    private int estado;
    private long estacion_retiro;
    private long estacion_devolucion;
    private LocalDateTime fecha_hora_retiro;
    private LocalDateTime fecha_hora_devolucion;
    private double monto;
    private long tarifa;

}
