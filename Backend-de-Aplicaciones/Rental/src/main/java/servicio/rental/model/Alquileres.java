package servicio.rental.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "ALQUILERES")
@Data
@NoArgsConstructor
public class Alquileres {

    @Id
    @GeneratedValue(generator = "Alquileres")
    @GenericGenerator(name = "Alquileres", strategy = "increment")
    private long id;

    @Column(name = "ID_CLIENTE")
    private String id_cliente;

    @Column(name = "ESTADO")
    private int estado;

    @Column(name = "ESTACION_RETIRO")
    private long estacion_retiro;

    @Column(name = "ESTACION_DEVOLUCION")
    private long estacion_devolucion;

    @Column(name = "FECHA_HORA_RETIRO")
    private LocalDateTime fecha_hora_retiro;

    @Column(name = "FECHA_HORA_DEVOLUCION")
    private LocalDateTime fecha_hora_devolucion;

    @Column(name = "MONTO")
    private double monto;

    @Column(name = "ID_TARIFA")
    private long tarifa;


}