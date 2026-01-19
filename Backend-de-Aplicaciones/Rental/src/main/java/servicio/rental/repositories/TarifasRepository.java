package servicio.rental.repositories;

import servicio.rental.model.Tarifas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarifasRepository extends JpaRepository<Tarifas, Long> {


}