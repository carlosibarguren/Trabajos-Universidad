package servicio.rental.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "TARIFAS")
@Data
@NoArgsConstructor

public class Tarifas {

    @Id
    @GeneratedValue(generator = "Tarifas")
    @GenericGenerator(name = "Tarifas", strategy = "increment")
    private long id;

    @Column(name = "TIPO_TARIFA")
    private Integer tipo_tarifa;

    @Column(name = "DEFINICION")
    private String definicion;

    @Column(name = "DIA_SEMANA")
    private Integer dia_semana;

    @Column(name = "DIA_MES")
    private Integer dia_mes;

    @Column(name = "MES")
    private Integer mes;

    @Column(name = "ANIO")
    private Integer anio;

    @Column(name = "MONTO_FIJO_ALQUILER")
    private double monto_fijo_alquiler;

    @Column(name = "MONTO_MINUTO_FRACCION")
    private double monto_minuto_fraccion;

    @Column(name = "MONTO_KM")
    private double monto_km;

    @Column(name = "MONTO_HORA")
    private double monto_hora;

}
