DROP DATABASE EXAMENES;
CREATE DATABASE EXAMENES;
USE EXAMENES;
CREATE TABLE EXAMENES(
    id_exam INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    periodo VARCHAR(10),
    semestre VARCHAR(10),
    fecha DATE,
    salon VARCHAR(30),
    carrera VARCHAR(30),
    horario TIME
);

DESCRIBE EXAMENES;
INSERT INTO EXAMENES(nombre,periodo,semestre,fecha,salon,horario) values("analisis","I","IV","1999-08-03","E101","12:01");
SELECT * FROM EXAMENES;