# Geometría de Sólidos Constructiva (CSG)

Con este ejercicio el alumno se familiarizará con las operaciones booleanas como medio de construir sólidos con geometría compleja a partir de otros sólidos más sencillos. El vídeo geometria-solidos-constructiva.mp4 muestra el resultado.

En cada operación se puede partir de sólidos que se hayan generado a partir de:
- Primitivas
- Revolución
- Barridos
- Otras operaciones booleanas

El procedimiento a seguir es, en general, el siguiente:
- Crear las geometrías a con las que se va a operar
- Colocarlas en la posición y orientación adecuada para la siguiente operación
- Construir las versiones ThreeBSP de dichas geometrías
- Operarlas
- Finalmente, se construye el Mesh a partir de la geometría final
