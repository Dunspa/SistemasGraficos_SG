// Jose Luis Gallego Peña
class Rombo extends THREE.Object3D {
   constructor() {
		super();

      // Instrucciones para crear el contorno
      var contornoRombo = new THREE.Shape();
      contornoRombo.moveTo(0, 4.75);
      contornoRombo.lineTo(2.375, 0);
      contornoRombo.lineTo(0, -4.75);
      contornoRombo.lineTo(-2.375, 0);
      contornoRombo.lineTo(0, 4.75);
      var opciones = {amount: 1, bevelEnabled: true, bevelSegments: 10, steps: 1, bevelSize: 1, bevelThickness: 1};

		// Construir geometría a partir del contorno
      var geometriaRombo = new THREE.ExtrudeGeometry(contornoRombo, opciones);
		// Material
      var materialRombo = new THREE.MeshNormalMaterial();
      
      // Formar nodos de rotación y translación para la animación
      this.ab = new THREE.Mesh(geometriaRombo, materialRombo);   // Geometría del rombo

      this.cd = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
      this.cd.position.x = -20; // Transformación fija
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