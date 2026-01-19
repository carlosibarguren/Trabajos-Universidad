package servicio.rental.controllers;

import servicio.rental.services.AlquileresService;
import servicio.rental.dtos.AlquileresDTO;
import servicio.rental.dtos.AlquileresRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alquileres")
public class AlquileresController {

    @Autowired
    private AlquileresService alquileresService;

    @GetMapping
    public ResponseEntity<List<AlquileresDTO>> getAllAlquileres() {
        List<AlquileresDTO> alquileres = alquileresService.findAll();
        return ResponseEntity.ok(alquileres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlquileresDTO> getAlquilerById(@PathVariable Long id) {
        AlquileresDTO alquiler = alquileresService.findById(id);
        if (alquiler != null) {
            return ResponseEntity.ok(alquiler);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Iniciado")
    public ResponseEntity<List<AlquileresDTO>> getAllAlquileresEstado() {
        List<AlquileresDTO> alquileres = alquileresService.findAllByEstado(1);
        return ResponseEntity.ok(alquileres);
    }


    @PostMapping
    public ResponseEntity<AlquileresDTO> createAlquiler(@RequestBody AlquileresDTO alquilerDto) {
        AlquileresDTO createdAlquiler = alquileresService.save(alquilerDto);
        return ResponseEntity.ok(createdAlquiler);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlquileresDTO> updateAlquiler(@PathVariable Long id, @RequestBody AlquileresDTO alquilerDto) {
        AlquileresDTO updatedAlquiler = alquileresService.update(id, alquilerDto);
        if (updatedAlquiler != null) {
            return ResponseEntity.ok(updatedAlquiler);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<AlquileresDTO> finalizarAlquiler(@RequestBody AlquileresRequestDTO alquilerRequestDto){

        long idAlquiler = alquilerRequestDto.getIdAlquiler();
        long idEstacionDevolucion = alquilerRequestDto.getIdEstacionDevolucion();
        String monedaDestino = alquilerRequestDto.getMonedaDestino();

        AlquileresDTO updatedAlquiler = alquileresService.finalizarAlquiler(idAlquiler,idEstacionDevolucion, monedaDestino);

        if (updatedAlquiler != null) {
            return ResponseEntity.ok(updatedAlquiler);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlquiler(@PathVariable Long id) {
        alquileresService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
