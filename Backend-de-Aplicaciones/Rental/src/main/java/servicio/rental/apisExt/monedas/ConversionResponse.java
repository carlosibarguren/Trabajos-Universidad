package servicio.rental.apisExt.monedas;

import lombok.Data;

@Data
public class ConversionResponse {
    private String moneda;

    private double importe;

}
