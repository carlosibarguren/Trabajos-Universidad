package servicio.stations.services;

import servicio.stations.dtos.EstacionesDTO;
import servicio.stations.model.Estaciones;
import servicio.stations.repositories.EstacionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EstacionesService {

    @Autowired
    private EstacionesRepository estacionesRepository;

    //Esta función recupera todas las entidades Estaciones de la base de datos y
    // las convierte en una lista de EstacionesDTO.
    public List<EstacionesDTO> findAll() {
        List<Estaciones> estaciones = estacionesRepository.findAll();
        return estaciones.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    //Esta función busca una entidad Estaciones por su identificador y devuelve su representación
    // EstacionesDTO, o null si no se encuentra.
    public EstacionesDTO findById(Long id) {
        Optional<Estaciones> estacion = estacionesRepository.findById(id);
        return estacion.map(this::convertToDto).orElse(null);
    }

    // Guarda un objeto EstacionesDTO convirtiéndolo en una entidad Estaciones y devolviendo su representación EstacionesDTO.
    public EstacionesDTO save(EstacionesDTO estacionDto) {
        Estaciones estacion = convertToEntity(estacionDto);
        Estaciones savedEstacion = estacionesRepository.save(estacion);
        return convertToDto(savedEstacion);
    }

    // Elimina una entidad Estaciones de la base de datos según su identificador.
    public void deleteById(Long id) {
        estacionesRepository.deleteById(id);
    }

    // Actualiza una entidad Estaciones en la base de datos según su identificador, utilizando la información proporcionada en un EstacionesDTO.
    public EstacionesDTO update(Long id, EstacionesDTO estacionDto) {
        Optional<Estaciones> existingEstaciones = estacionesRepository.findById(id);
        if (existingEstaciones.isPresent()) {
            Estaciones estacion = convertToEntity(estacionDto);
            estacion.setId(id);
            Estaciones updatedEstacion = estacionesRepository.save(estacion);
            return convertToDto(updatedEstacion);
        } else {
            return null;
        }
    }

    public EstacionesDTO getEstacionMasCercana(double latitud, double longitud) {
        List<Estaciones> estaciones = estacionesRepository.findAll();

        double distanciaMinima = Double.MAX_VALUE;
        Estaciones estacionMasCercana = null;

        for (Estaciones estacion : estaciones) {
            double distancia = calcularDistancia(latitud, longitud, estacion.getLatitud(), estacion.getLongitud());

            if (distancia < distanciaMinima) {
                distanciaMinima = distancia;
                estacionMasCercana = estacion;
            }
        }

        // Devolver la estación más cercana o realizar las acciones necesarias con estacionMasCercana
        // Puedes mapear los datos a un EstacionesDTO si es necesario
        return convertToDto(estacionMasCercana);
    }

    private EstacionesDTO convertToDto(Estaciones estacion) {
        EstacionesDTO estacionDto = new EstacionesDTO();
        estacionDto.setId(estacion.getId());
        estacionDto.setNombre(estacion.getNombre());
        estacionDto.setFecha_hora_creacion(estacion.getFecha_hora_creacion());
        estacionDto.setLatitud(estacion.getLatitud());
        estacionDto.setLongitud(estacion.getLongitud());
        return estacionDto;
    }

    private Estaciones convertToEntity(EstacionesDTO estacionDto) {
        Estaciones estacion = new Estaciones();
        estacion.setId(estacionDto.getId());
        estacion.setNombre(estacionDto.getNombre());
        estacion.setFecha_hora_creacion(estacionDto.getFecha_hora_creacion());
        estacion.setLatitud(estacionDto.getLatitud());
        estacion.setLongitud(estacionDto.getLongitud());
        return estacion;
    }

    public double calcularDistancia(double latitudA, double longitudA, double latitudB, double longitudB){
        // Convertir la diferencia de latitud y longitud a distancia en metros
        double distanciaEnMetros = Math.sqrt(Math.pow((latitudB - latitudA) * 110000, 2) + Math.pow((longitudB - longitudA) * 110000, 2));
        return distanciaEnMetros/1000;
    }



}
