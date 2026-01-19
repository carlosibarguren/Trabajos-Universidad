package servicio.rental.apisExt.estaciones;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class Estaciones {

    private final RestTemplate restTemplate;
    private final String apiUrl;

    @Autowired
    public Estaciones(RestTemplate restTemplate, @Value("${api.url.estaciones}") String apiUrl) {
        this.restTemplate = restTemplate;
        this.apiUrl = apiUrl;
    }

    public EstacionesResponse obtenerEstacionPorId(long idEstacion) {
        String url = apiUrl + "/{idEstacion}";

        // Hacer la solicitud GET para obtener información sobre la estación
        EstacionesResponse estacion = restTemplate.getForObject(url, EstacionesResponse.class, idEstacion);

        return estacion;
    }

    public double obtenerDistancia(double latitudA, double longitudA, double latitudB, double longitudB ) {
        String url = apiUrl + "/distancias?latitudA={latitudA}&longitudA={longitudA}&latitudB={latitudB}&longitudB={longitudB}";

        // Hacer la solicitud GET para obtener información sobre la estación
        double distancia = restTemplate.getForObject(url, Double.class, latitudA, longitudA, latitudB, longitudB);

        return distancia;
    }
}
