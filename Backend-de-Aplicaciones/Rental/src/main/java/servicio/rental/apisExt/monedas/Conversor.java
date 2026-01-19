package servicio.rental.apisExt.monedas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Conversor {

    private final RestTemplate restTemplate;
    private final String apiUrl;


    @Autowired
    public Conversor(RestTemplate restTemplate, @Value("${api.url.moneda}") String apiUrl) {
        this.restTemplate = restTemplate;
        this.apiUrl = apiUrl;
    }

    public double convertirMoneda(String monedaDestino, double monto) {
        // Crear la solicitud de conversión
        ConversionRequest conversionRequest = new ConversionRequest();
        conversionRequest.setMoneda_destino(monedaDestino);
        conversionRequest.setImporte(monto);

        // Configurar las cabeceras
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Crear la entidad HTTP con la solicitud y las cabeceras
        HttpEntity<ConversionRequest> requestEntity = new HttpEntity<>(conversionRequest, headers);

        // Enviar la solicitud de conversión a la API
        ConversionResponse conversionResponse = restTemplate.postForObject(apiUrl, requestEntity, ConversionResponse.class);

        // Devolver el monto convertido
        return conversionResponse != null ? conversionResponse.getImporte() : 0.0;
    }
}

