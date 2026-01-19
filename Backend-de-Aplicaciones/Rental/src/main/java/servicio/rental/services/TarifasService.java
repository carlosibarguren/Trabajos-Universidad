package servicio.rental.services;


import servicio.rental.dtos.TarifasDTO;
import servicio.rental.model.Tarifas;
import servicio.rental.repositories.TarifasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TarifasService {

    @Autowired
    private TarifasRepository tarifasRepository;

    //Esta función recupera todas las entidades Tarifas de la base de datos y
    // las convierte en una lista de TarifasDTO.
    public List<TarifasDTO> findAll() {
        List<Tarifas> tarifas = tarifasRepository.findAll();
        return tarifas.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    //Esta función busca una entidad Tarifas por su identificador y devuelve su representación
    // Tarifas DTO, o null si no se encuentra.
    public TarifasDTO findById(Long id) {
        Optional<Tarifas> tarifa = tarifasRepository.findById(id);
        return tarifa.map(this::convertToDto).orElse(null);
    }

    // Guarda un objeto TarifasDTO convirtiéndolo en una entidad Tarifas y devolviendo su representación TarifasDTO.
    public TarifasDTO save(TarifasDTO tarifaDto) {
        Tarifas tarifa = convertToEntity(tarifaDto);
        Tarifas savedTarifa = tarifasRepository.save(tarifa);
        return convertToDto(savedTarifa);
    }

    // Elimina una entidad Tarifas de la base de datos según su identificador.
    public void deleteById(Long id) {
        tarifasRepository.deleteById(id);
    }

    // Actualiza una entidad Tarifas en la base de datos según su identificador, utilizando la información proporcionada en un TarifasDTO.
    public TarifasDTO update(Long id, TarifasDTO tarifasDto) {
        Optional<Tarifas> existingTarifas = tarifasRepository.findById(id);
        if (existingTarifas.isPresent()) {
            Tarifas tarifa = convertToEntity(tarifasDto);
            tarifa.setId(id);
            Tarifas updatedTarifa = tarifasRepository.save(tarifa);
            return convertToDto(updatedTarifa);
        } else {
            return null;
        }
    }

    public Tarifas encontrarTarifa(LocalDateTime fechaAlquiler){
        int dia = fechaAlquiler.getDayOfMonth();
        int mes = fechaAlquiler.getMonthValue();
        int anio = fechaAlquiler.getYear();

        List<Tarifas> tarifas = tarifasRepository.findAll();
        Tarifas tarifaDelAlquiler = null;

        for (Tarifas tarifa : tarifas) {
            if (tarifa.getDia_mes() != null){
                if (tarifa.getDia_mes() == dia && tarifa.getMes() == mes && tarifa.getAnio() == anio) {
                    tarifaDelAlquiler = tarifa;
                    break;
                }
            }
        }

        if (tarifaDelAlquiler == null){
            long numeroDiaDeLaSemana = fechaAlquiler.getDayOfWeek().getValue();
            Optional<Tarifas> tarifa = tarifasRepository.findById(numeroDiaDeLaSemana);
            tarifaDelAlquiler = tarifa.orElse(null);
        }

        return tarifaDelAlquiler;
    }


    private TarifasDTO convertToDto(Tarifas tarifa) {
        TarifasDTO tarifasDto = new TarifasDTO();
        tarifasDto.setId(tarifa.getId());
        tarifasDto.setTipo_tarifa(tarifa.getTipo_tarifa());
        tarifasDto.setDefinicion(tarifa.getDefinicion());
        tarifasDto.setDia_semana(tarifa.getDia_semana());

        if (tarifa.getDia_mes() != null) {
            tarifasDto.setDia_mes(tarifa.getDia_mes());
        } else {
            // Puedes asignar un valor predeterminado o manejar el caso nulo de alguna manera
            tarifasDto.setDia_mes(0);
        }

        // Verificar nulidad antes de asignar valores
        if (tarifa.getAnio() != null) {
            tarifasDto.setAnio(tarifa.getAnio());
        } else {
            // Puedes asignar un valor predeterminado o manejar el caso nulo de alguna manera
            tarifasDto.setAnio(0);
        }

        if (tarifa.getMes() != null) {
            tarifasDto.setMes(tarifa.getMes());
        } else {
            // Puedes asignar un valor predeterminado o manejar el caso nulo de alguna manera
            tarifasDto.setMes(0);
        }
        tarifasDto.setMonto_fijo_alquiler(tarifa.getMonto_fijo_alquiler());
        tarifasDto.setMonto_minuto_fraccion(tarifa.getMonto_minuto_fraccion());
        tarifasDto.setMonto_km(tarifa.getMonto_km());
        tarifasDto.setMonto_hora(tarifa.getMonto_hora());
        return tarifasDto;
    }

    private Tarifas convertToEntity(TarifasDTO tarifaDto) {
        Tarifas tarifa = new Tarifas();
        tarifa.setId(tarifaDto.getId());
        tarifa.setTipo_tarifa(tarifaDto.getTipo_tarifa());
        tarifa.setDefinicion(tarifaDto.getDefinicion());
        tarifa.setDia_semana(tarifaDto.getDia_semana());
        tarifa.setDia_mes(tarifaDto.getDia_mes());
        tarifa.setAnio(tarifaDto.getAnio());
        tarifa.setMes(tarifaDto.getMes());
        tarifa.setMonto_fijo_alquiler(tarifaDto.getMonto_fijo_alquiler());
        tarifa.setMonto_minuto_fraccion(tarifaDto.getMonto_minuto_fraccion());
        tarifa.setMonto_km(tarifaDto.getMonto_km());
        tarifa.setMonto_hora(tarifaDto.getMonto_hora());
        return tarifa;
    }

}
