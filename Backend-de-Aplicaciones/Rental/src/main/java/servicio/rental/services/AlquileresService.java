package servicio.rental.services;

import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

import servicio.rental.apisExt.estaciones.EstacionesResponse;
import servicio.rental.dtos.AlquileresDTO;
//import servicio.Rental.dtos.EstacionesDTO;
import servicio.rental.model.Alquileres;
import servicio.rental.apisExt.monedas.Conversor;
import servicio.rental.apisExt.estaciones.Estaciones;
//import servicio.Rental.model.Estaciones;
import servicio.rental.model.Tarifas;
import servicio.rental.repositories.AlquileresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Ejemplo en Java con HttpClient


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlquileresService {

    @Autowired
    private AlquileresRepository alquileresRepository;

    @Autowired
    private TarifasService tarifasService;

    @Autowired
    private Conversor conversorExt;

    @Autowired
    private Estaciones estacionesExt;

    @Autowired
    private RestTemplate restTemplate;

    public List<AlquileresDTO> findAll() {
        List<Alquileres> alquileres = alquileresRepository.findAll();
        return alquileres.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public AlquileresDTO findById(Long id) {
        Optional<Alquileres> alquiler = alquileresRepository.findById(id);
        return alquiler.map(this::convertToDto).orElse(null);
    }

    public AlquileresDTO save(AlquileresDTO alquilerDto) {
        Alquileres alquiler = convertToEntity(alquilerDto);
        Alquileres savedAlquiler = alquileresRepository.save(alquiler);
        return convertToDto(savedAlquiler);
    }

    public void deleteById(Long id) {
        alquileresRepository.deleteById(id);
    }

    public AlquileresDTO update(Long id, AlquileresDTO alquilerDto) {
        Optional<Alquileres> existingAlquiler = alquileresRepository.findById(id);
        if (existingAlquiler.isPresent()) {
            Alquileres alquiler = convertToEntity(alquilerDto);
            alquiler.setId(id);
            Alquileres updatedAlquiler = alquileresRepository.save(alquiler);
            return convertToDto(updatedAlquiler);
        } else {
            return null;
        }
    }

    public List<AlquileresDTO> findAllByEstado(int estado) {
        List<AlquileresDTO> allAlquileres = findAll(); // Suponiendo que ya tienes un método findAll
        return allAlquileres.stream()
                .filter(alquiler -> alquiler.getEstado() == estado)
                .collect(Collectors.toList());
    }


    public AlquileresDTO finalizarAlquiler(long idAlquiler, long idEstacionDevolucion, String monedaDestino) {
        Optional<Alquileres> existingAlquiler = alquileresRepository.findById(idAlquiler);

        Alquileres alquiler = existingAlquiler.orElse(null);

        if (existingAlquiler.isPresent()) {

            Alquileres alquiler1 = existingAlquiler.get();
            LocalDateTime fechaHoraActual = LocalDateTime.now();

            Tarifas tarifa = tarifasService.encontrarTarifa(alquiler1.getFecha_hora_retiro());

            long id = alquiler.getEstacion_retiro();

            EstacionesResponse estacionRetiro =  estacionesExt.obtenerEstacionPorId(id);
            EstacionesResponse estacionDevolucion = estacionesExt.obtenerEstacionPorId(idEstacionDevolucion);

            double latitudA = estacionRetiro.getLatitud();
            double longitudA = estacionRetiro.getLongitud();
            double latitudB = estacionDevolucion.getLatitud();
            double longitudB = estacionDevolucion.getLongitud();

            double distancia = estacionesExt.obtenerDistancia(latitudA, longitudA, latitudB, longitudB);
            double montoTiempo = calcularMontoTiempo(
                    alquiler.getFecha_hora_retiro(), fechaHoraActual,
                    tarifa.getMonto_hora(), tarifa.getMonto_minuto_fraccion());


            double montoTotal = tarifa.getMonto_fijo_alquiler() + montoTiempo +
                    (tarifa.getMonto_km() * distancia);

            if(monedaDestino!=null){
                double m = montoTotal;
                montoTotal = conversorExt.convertirMoneda(monedaDestino, m);
            }


            alquiler.setMonto(montoTotal);
            alquiler.setFecha_hora_devolucion(fechaHoraActual);
            alquiler.setEstado(2);
            alquiler.setEstacion_devolucion(idEstacionDevolucion);
            alquiler.setTarifa(tarifa.getId());

            Alquileres updatedAlquiler = alquileresRepository.save(alquiler);

            return convertToDto(updatedAlquiler);
        } else {
            return null;
        }
    }



    public double calcularMontoTiempo(LocalDateTime fechaInicio, LocalDateTime fechaFin,
                                      double montoHora, double montoMinuto){
        LocalTime horaInicio = fechaInicio.toLocalTime();
        LocalTime horaFin = fechaFin.toLocalTime();
        long diferenciaEnMinutos = horaInicio.until(horaFin, ChronoUnit.MINUTES);
        double horas = diferenciaEnMinutos / 60;
        double minutos = diferenciaEnMinutos % 60;
        if (minutos > 30){
            horas += 1;
            minutos = 0;
        }
        double montoTiempo = (horas * montoHora) + (minutos * montoMinuto);
        return montoTiempo;
    }

    private AlquileresDTO convertToDto(Alquileres alquiler) {
        AlquileresDTO alquilerDto = new AlquileresDTO();
        alquilerDto.setId(alquiler.getId());
        alquilerDto.setId_cliente(alquiler.getId_cliente());
        alquilerDto.setEstado(alquiler.getEstado());
        alquilerDto.setEstacion_retiro(alquiler.getEstacion_retiro());
        alquilerDto.setEstacion_devolucion(alquiler.getEstacion_devolucion());
        alquilerDto.setFecha_hora_retiro(alquiler.getFecha_hora_retiro());
        alquilerDto.setFecha_hora_devolucion(alquiler.getFecha_hora_devolucion());
        alquilerDto.setMonto(alquiler.getMonto());
        alquilerDto.setTarifa(alquiler.getTarifa());
        return alquilerDto;
    }

    private Alquileres convertToEntity(AlquileresDTO alquilerDto) {
        Alquileres alquiler = new Alquileres();
        alquiler.setId(alquilerDto.getId());
        alquiler.setId_cliente(alquilerDto.getId_cliente());
        alquiler.setEstado(alquilerDto.getEstado());
        alquiler.setEstacion_retiro(alquilerDto.getEstacion_retiro());
        alquiler.setEstacion_devolucion(alquilerDto.getEstacion_devolucion());
        alquiler.setFecha_hora_retiro(alquilerDto.getFecha_hora_retiro());
        alquiler.setFecha_hora_devolucion(alquilerDto.getFecha_hora_devolucion());
        alquiler.setMonto(alquilerDto.getMonto());
        alquiler.setTarifa(alquilerDto.getTarifa());
        return alquiler;
    }


}