# Ejercicio 3: Geometría por revolución

Mediante este ejercicio el alumno aprenderá a crear geometría por revolución a partir de una línea definida en un plano.  El vídeo geometria-revolucion.mp4 muestra un posible resultado del ejercicio.  
A tener en cuenta:

- La línea a revolucionar se define como un array de Vector3 con la z = 0 y se usa dicho array, tal cual, al crear la geometría por revolución. Sin embargo, para crear y visualizar una línea, se debe asignar dicho array al atributo vertices de una Geometry y después usar esa Geometry al instanciar la clase Line.

- Los ángulos se dan en radianes.
