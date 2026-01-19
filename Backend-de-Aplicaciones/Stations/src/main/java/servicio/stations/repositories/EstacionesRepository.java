package servicio.stations.repositories;

import servicio.stations.model.Estaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstacionesRepository extends JpaRepository<Estaciones, Long> {


}
