Mediante este ejercicio el alumno debe familiarizarse con las diferentes figuras 3D que proporciona la biblioteca THREE.JS y conocer sus principales parámetros.  
A tener en cuenta:

- Modificar una geometría ya creada implica volver a crearla. Debe evitarse, en la
medida de lo posible, crear nuevas geometrías para cada frame ya que se dejarían
muchos objetos huérfanos y debería actuar el recolector de basura con mucha fre-
cuencia.

- El material usado en el vídeo es MeshNormalMaterial, que asigna los colores
a los polígonos según el vector normal de sus caras o sus vértices.

- El sombreado plano o suave se consigue asignándole true o false, respectiva-
mente, al atributo flatShading del material. Tras modificar dicho atributo hay
que asignar true al atributo needsUpdate del material para que el cambio sea
tenido en cuenta en el siguiente frame.

- El movimiento continuo se consigue incrementando un poco la rotación de cada
figura en cada frame. Por ejemplo: this.caja.rotation.y += 0.01;
