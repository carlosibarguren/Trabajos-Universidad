package servicio.stations.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ESTACIONES")
@Data
@NoArgsConstructor

public class Estaciones {

    @Id
    @GeneratedValue(generator = "Estaciones")
    @GenericGenerator(name = "Estaciones", strategy = "increment")
    private long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "FECHA_HORA_CREACION")
    private LocalDateTime fecha_hora_creacion;

    @Column(name = "LATITUD")
    private double latitud;

    @Column(name = "LONGITUD")
    private double longitud;

}
