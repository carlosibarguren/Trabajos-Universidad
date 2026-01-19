package servicio.stations.controllers;

import servicio.stations.dtos.EstacionesDTO;
import servicio.stations.services.EstacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estaciones")
public class EstacionesController {

    @Autowired
    private EstacionesService estacionesService;

    @GetMapping("/all")
    public ResponseEntity<List<EstacionesDTO>> getAllEstaciones() {
        List<EstacionesDTO> estaciones = estacionesService.findAll();
        return ResponseEntity.ok(estaciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstacionesDTO> getEstacionById(@PathVariable Long id) {
        EstacionesDTO estacion = estacionesService.findById(id);
        if (estacion != null) {
            return ResponseEntity.ok(estacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<EstacionesDTO> getEstacionMasCercana(@RequestParam double latitud, @RequestParam double longitud) {
        EstacionesDTO estacion = estacionesService.getEstacionMasCercana(latitud, longitud);
        if (estacion != null) {
            return ResponseEntity.ok(estacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/distancias")
    public ResponseEntity<Double> getDistancia(@RequestParam double latitudA, @RequestParam double longitudA,@RequestParam double latitudB, @RequestParam double longitudB) {
        double distancia = estacionesService.calcularDistancia(latitudA,longitudA,latitudB,longitudB);
        if (distancia != 0) {
            return ResponseEntity.ok(distancia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<EstacionesDTO> createEstacion(@RequestBody EstacionesDTO estacionDto) {
        EstacionesDTO createdEstacion = estacionesService.save(estacionDto);
        return ResponseEntity.ok(createdEstacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstacionesDTO> updateEstacion(@PathVariable Long id, @RequestBody EstacionesDTO estacionDto) {
        EstacionesDTO updatedEstacion = estacionesService.update(id, estacionDto);
        if (updatedEstacion != null) {
            return ResponseEntity.ok(updatedEstacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEstacion(@PathVariable Long id) {
        estacionesService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

