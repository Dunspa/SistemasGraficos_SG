// Jose Luis Gallego Peña
class Trebol extends THREE.Object3D {
   constructor() {
		super();

      // Instrucciones para crear el contorno
      var contornoTrebol = new THREE.Shape();
      contornoTrebol.absarc(0, 2.375, 2.375, 0, 2 * Math.PI);
      contornoTrebol.absarc(2.375, -2.375, 2.375, 0, 2 * Math.PI);
      contornoTrebol.absarc(-2.375, -2.375, 2.375, 0, 2 * Math.PI);
      var opciones = {amount: 1, bevelEnabled: true, bevelSegments: 10, steps: 1, bevelSize: 1, bevelThickness: 1};

		// Construir geometría a partir del contorno
      var geometriaTrebol = new THREE.ExtrudeGeometry(contornoTrebol, opciones);
		// Material
      var materialTrebol = new THREE.MeshNormalMaterial();
      
      // Formar nodos de rotación y translación para la animación
      this.ab = new THREE.Mesh(geometriaTrebol, materialTrebol);   // Geometría del trebol
      this.base = new Base();
      this.base.position.y = -7;
      this.ab.add(this.base); // Base de la figura

      this.cd = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
      this.cd.position.y = -20; // Transformación fija
      this.cd.add(this.ab);

      this.e = new THREE.Object3D();   // Nodo que rota sobre el eje z a la distancia definida
      this.e.add(this.cd);

      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.e);
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.e.rotation.z += 0.01; // Rotar sobre Z
      this.cd.rotation.z -= 0.01;   // Mantener verticalidad
      this.ab.rotation.y += 0.02;   // Rotar sobre si mismo
   }
}