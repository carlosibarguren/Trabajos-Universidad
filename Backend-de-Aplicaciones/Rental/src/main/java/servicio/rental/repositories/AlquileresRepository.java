package servicio.rental.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import servicio.rental.model.Alquileres;

@Repository
public interface AlquileresRepository extends JpaRepository<Alquileres, Long> {


}