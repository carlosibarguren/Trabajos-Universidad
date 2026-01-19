package servicio.rental.dtos;

import lombok.Data;
@Data

public class AlquileresRequestDTO {
        private long idAlquiler;
        private long idEstacionDevolucion;
        private String monedaDestino;

}
