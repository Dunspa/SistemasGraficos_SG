// Jose Luis Gallego Peña
class Corazon extends THREE.Object3D {
   constructor() {
		super();

      // Instrucciones para crear el contorno
		var contornoCorazon = new THREE.Shape();
      contornoCorazon.moveTo(2.5, 2.5);
      contornoCorazon.bezierCurveTo(2.5, 2.5, 2, 0, 0, 0);
      contornoCorazon.bezierCurveTo(-3, 0, -3, 3.5, -3, 3.5);
      contornoCorazon.bezierCurveTo(-3, 5.5, -1.5, 7.7, 2.5, 9.5);
      contornoCorazon.bezierCurveTo(6, 7.7, 8, 5.5, 8, 3.5);
      contornoCorazon.bezierCurveTo(8, 3.5, 8, 0, 5, 0);
      contornoCorazon.bezierCurveTo(3.5, 0, 2.5, 2.5, 2.5, 2.5);
      var opciones = {amount: 1, bevelEnabled: true, bevelSegments: 10, steps: 1, bevelSize: 1, bevelThickness: 1};

		// Construir geometría a partir del contorno
      var geometriaCorazon = new THREE.ExtrudeGeometry(contornoCorazon, opciones);
      geometriaCorazon.translate(-2.6, -5, -0.5);
      geometriaCorazon.rotateX(Math.PI);
		// Material
      var materialCorazon = new THREE.MeshNormalMaterial();
      
      // Formar nodos de rotación y translación para la animación
      this.ab = new THREE.Mesh(geometriaCorazon, materialCorazon);   // Geometría del corazon

      this.cd = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
      this.cd.position.x = 20; // Transformación fija
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
 