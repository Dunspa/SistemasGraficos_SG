// Jose Luis Gallego Peña
class Barrido extends THREE.Object3D {
   constructor() {
      super();

      // Instrucciones para crear el contorno
      var contornoBarrido = new THREE.Shape();
      contornoBarrido.moveTo(0, 4.75);
      contornoBarrido.lineTo(2.375, 0);
      contornoBarrido.lineTo(0, -4.75);
      contornoBarrido.lineTo(-2.375, 0);
      contornoBarrido.lineTo(0, 4.75);

      // Camino del barrido
      var pts = [];
      pts.push(new THREE.Vector3(0.0, 0.0, 0.0));
      pts.push(new THREE.Vector3(0.0, 0.0, 5.0));
      pts.push(new THREE.Vector3(0.0, 15.0, 10.0));
      pts.push(new THREE.Vector3(-5.0, 15.0, 15.0));
      var camino = new THREE.CatmullRomCurve3(pts);

      var opciones = {amount: 1, bevelEnabled: true, bevelSegments: 10, steps: 20, curveSegments: 4, bevelSize: 1, bevelThickness: 1, extrudePath: camino};

		// Construir geometría a partir del contorno
      var geometriaBarrido = new THREE.ExtrudeGeometry(contornoBarrido, opciones);
		// Material
      var materialBarrido = new THREE.MeshNormalMaterial();
      
      // Formar nodos de rotación y translación para la animación
      this.ab = new THREE.Mesh(geometriaBarrido, materialBarrido);   // Geometría del Barrido

      this.cd = new THREE.Object3D();  // Nodo que mantiene verticalidad y se fija a una distancia x
      //this.cd.position.x = -20; // Transformación fija
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
      this.ab.rotation.x += 0.02;
      this.ab.rotation.y += 0.02;
      this.ab.rotation.z += 0.02;
   }
}