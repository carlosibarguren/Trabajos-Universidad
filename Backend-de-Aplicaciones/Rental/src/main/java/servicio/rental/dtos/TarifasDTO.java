package servicio.rental.dtos;


import lombok.Data;

@Data
public class TarifasDTO {
    private long id;
    private int tipo_tarifa;
    private String definicion;
    private int dia_semana;
    private int dia_mes;
    private int mes;
    private int anio;
    private double monto_fijo_alquiler;
    private double monto_minuto_fraccion;
    private double monto_km;
    private double monto_hora;

}
