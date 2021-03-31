

CREATE TABLE `nueva_reserva` (
  `id_reserva` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_habitacion` INT NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE,
  `adultos` INT NOT NULL,
  `ninos` INT
);