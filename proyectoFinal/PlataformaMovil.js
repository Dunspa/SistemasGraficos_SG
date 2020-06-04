// Jose Luis Gallego Peña
class Recorrido extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Camino en forma de 8 para la animación
      var spline1 = new THREE.CatmullRomCurve3([
         new THREE.Vector3(0.0, 30.0, 0.0),
         new THREE.Vector3(15.0, 30.0, 0.0),
         new THREE.Vector3(25.0, 25.0, 30.0),
         new THREE.Vector3(40.0, 50.0, -25.0),
         new THREE.Vector3(30.0, 35.0, -22.5),
         new THREE.Vector3(0.0, 40.0, 0.0)
      ]);
      var spline2 = new THREE.CatmullRomCurve3([
         new THREE.Vector3(0.0, 40.0, 0.0),
         new THREE.Vector3(-10.0, 41.0, 10.0),
         new THREE.Vector3(-40.0, 40.0, 35.0),
         new THREE.Vector3(-35.0, 45.0, 25.0),
         new THREE.Vector3(-25.0, 25.0, 0.0),
         new THREE.Vector3(0.0, 30.0, 0.0)
      ]);
      var geomCamino1 = new THREE.Geometry().setFromPoints(spline1.getPoints(100));
      var geomCamino2 = new THREE.Geometry().setFromPoints(spline2.getPoints(100));
      var matCamino = new THREE.LineBasicMaterial({color: 0xff0000});
      this.camino1 = new THREE.Line(geomCamino1, matCamino);
      this.camino2 = new THREE.Line(geomCamino2, matCamino);

      // Nave que recorrerá el camino
      var geomNave = new THREE.ConeGeometry(2.0, 10.0, 3.0);
      geomNave.rotateX(Math.PI/2);
      var matNave = new THREE.MeshNormalMaterial();
      this.nave = new THREE.Mesh(geomNave, matNave);

      // Animación de la nave por un recorrido (4 segundos, 2 para cada mitad)
      var that = this;
      var origen = {x: 0.0};
      var destino = {x: 1.0};
      this.movimiento1 = new TWEEN.Tween(origen).to(destino, 4000)
         .easing(TWEEN.Easing.Quadratic.InOut)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline1.getPointAt(origen.x);
            that.nave.position.copy(posicion);
            // Orientación del objeto a animar
            var tangente = spline1.getTangentAt(origen.x);
            posicion.add(tangente);
            that.nave.lookAt(posicion);
         })
         .onComplete (function () {
            origen.x = 0.0;
         });

      this.movimiento2 = new TWEEN.Tween(origen).to(destino, 8000)
         .easing(TWEEN.Easing.Quadratic.InOut)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = spline2.getPointAt(origen.x);
            that.nave.position.copy(posicion);
            // Orientación del objeto a animar
            var tangente = spline2.getTangentAt(origen.x);
            posicion.add(tangente);
            that.nave.lookAt(posicion);
         })
         .onComplete (function () {
            origen.x = 0.0;
         });

      this.movimiento1.chain(this.movimiento2); // Encadenar las dos animaciones
      this.movimiento2.chain(this.movimiento1);
      
      this.add(this.camino1);
      this.add(this.camino2);
      this.add(this.nave);

      this.movimiento1.start();
   }

   update() {
      // Update de la animación
      TWEEN.update();
   }
}
 