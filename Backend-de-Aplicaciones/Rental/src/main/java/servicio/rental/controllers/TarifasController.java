package servicio.rental.controllers;


import servicio.rental.dtos.TarifasDTO;
import servicio.rental.services.TarifasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarifas")
public class TarifasController {

    @Autowired
    private TarifasService tarifasService;

    @GetMapping
    public ResponseEntity<List<TarifasDTO>> getAllTarifas() {
        List<TarifasDTO> tarifas = tarifasService.findAll();
        return ResponseEntity.ok(tarifas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarifasDTO> getTarifaById(@PathVariable Long id) {
        TarifasDTO tarifa = tarifasService.findById(id);
        if (tarifa != null) {
            return ResponseEntity.ok(tarifa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TarifasDTO> createTarifa(@RequestBody TarifasDTO tarifaDto) {
        TarifasDTO createdTarifa = tarifasService.save(tarifaDto);
        return ResponseEntity.ok(createdTarifa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarifasDTO> updateTarifa(@PathVariable Long id, @RequestBody TarifasDTO tarifaDto) {
        TarifasDTO updatedTarifa = tarifasService.update(id, tarifaDto);
        if (updatedTarifa != null) {
            return ResponseEntity.ok(updatedTarifa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarifa(@PathVariable Long id) {
        tarifasService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}