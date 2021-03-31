USE pms_hotel;

CREATE TABLE cliente(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(60) NOT NULL, 
    apellido VARCHAR(60) NOT NULL, 
    sexo ENUM('M', 'F') NOT NULL, 
    nacionalidad VARCHAR(60) NOT NULL, 
    tipo_documento ENUM('Cedula', 'Cedula de Extranjeria', 'Diplomatico', 'Documento de Extranjeros', 'NIT', 'NIT Persona natural', 'NUIP', 'Pasaporte', 'Registro Civil', 'Tarjeta de Identidad') NOT NULL, 
    numero_documento VARCHAR(60) NOT NULL, 
    fecha_expedicion DATE NOT NULL, 
    lugar_expedicion VARCHAR(60) NOT NULL,
    celular VARCHAR(60) NOT NULL, 
    correo VARCHAR(60) NOT NULL  
);
