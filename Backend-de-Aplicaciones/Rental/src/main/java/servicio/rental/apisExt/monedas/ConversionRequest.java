package servicio.rental.apisExt.monedas;

public class ConversionRequest {
    public String getMoneda_destino() {
        return moneda_destino;
    }

    public double getImporte() {
        return importe;
    }

    public void setMoneda_destino(String moneda_destino) {
        this.moneda_destino = moneda_destino;
    }

    public void setImporte(double importe) {
        this.importe = importe;
    }

    private String moneda_destino;
    private double importe;

}
