// Jose Luis Gallego Peña
class Elipse extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);
      
      // Prisma con base forma elipse
      var curvaElipse = new THREE.EllipseCurve(0.0, 0.0, 20.0 + this.guiControls.extension, 20.0);
      var puntosElipse = curvaElipse.getPoints(50);
      var curvaElipse = new THREE.Shape(puntosElipse);
      var options = {steps: 1, depth: 10, bevelEnabled: false};
      var geomElipse = new THREE.ExtrudeGeometry(curvaElipse, options);
      var matElipse = new THREE.MeshNormalMaterial({opacity: 0.35, transparent: true});
      this.elipse = new THREE.Mesh(geomElipse, matElipse);

      // Camino en forma de elipse para la animación
      curvaElipse = new THREE.EllipseCurve(0.0, 0.0, 22.0 + this.guiControls.extension, 22.0);
      puntosElipse = curvaElipse.getPoints(50);
      var vector = new Array();
      for (var i = 0 ; i < puntosElipse.length ; i++) {
         vector.push(new THREE.Vector3(puntosElipse[i]['x'], puntosElipse[i]['y'], 5));
      }
      this.spline = new THREE.CatmullRomCurve3(vector);
      var geomCamino = new THREE.Geometry();
      geomCamino.vertices = this.spline.getPoints(100);

      // Esfera que girará alrededor de la elipse
      var geomEsfera = new THREE.SphereGeometry(2.0, 20.0, 20.0);
      var matEsfera = new THREE.MeshNormalMaterial();
      this.esfera = new THREE.Mesh(geomEsfera, matEsfera);

      this.elipsoide = new THREE.Object3D();
      this.elipsoide.add(this.esfera);

      // Animación de esfera alrededor de una elipse (4 segundos, 2 para cada mitad)
      var that = this;
      var origen = {x: 0.0};
      var destino = {x: 0.5};
      this.movimiento1 = new TWEEN.Tween(origen).to(destino, 2000)
         .easing(TWEEN.Easing.Quadratic.InOut)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = that.spline.getPointAt(origen.x);
            that.esfera.position.copy(posicion);
            // Orientación del objeto a animar
            var tangente = that.spline.getTangentAt(origen.x);
            posicion.add(tangente);
            that.esfera.lookAt(posicion);
         })
         .onComplete (function () {
            origen.x = 1.0;
         });

      this.movimiento2 = new TWEEN.Tween(destino).to(origen, 2000)
         .easing(TWEEN.Easing.Quadratic.InOut)
         .onUpdate (function () {
            // Posición del objeto a animar
            var posicion = that.spline.getPointAt(destino.x);
            that.esfera.position.copy(posicion);
            // Orientación del objeto a animar
            var tangente = that.spline.getTangentAt(destino.x);
            posicion.add(tangente);
            that.esfera.lookAt(posicion);
         })
         .onComplete (function () {
            destino.x = 0.5;
         });

      this.movimiento1.chain(this.movimiento2); // Encadenar las dos animaciones
      this.movimiento2.chain(this.movimiento1);
      
      this.add(this.elipse);
      this.add(this.elipsoide);
      this.tiempoAnterior = Date.now();

      this.movimiento1.start();
   }

   createGUI(gui, titleGui) {
      this.guiControls = new function () {
         this.extension = 0.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.extension = 0.0;
         }
      }

      // Carpetas
      var that = this;
      var folder = gui.addFolder(titleGui);
      folder.add(this.guiControls, 'extension', 0.0, 25.0, 0.5).name("Extensión elipse : ").onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      // Volver a crear la geometría sólo si ha cambiado
      var curvaElipse = new THREE.EllipseCurve(0.0, 0.0, 20.0 + this.guiControls.extension, 20.0);
      var puntosElipse = curvaElipse.getPoints(50);
      var curvaElipse = new THREE.Shape(puntosElipse);
      var options = {steps: 1, depth: 10, bevelEnabled: false};
      this.elipse.geometry = new THREE.ExtrudeGeometry(curvaElipse, options);

      curvaElipse = new THREE.EllipseCurve(0.0, 0.0, 22.0 + this.guiControls.extension, 22.0);
      puntosElipse = curvaElipse.getPoints(50);
      var vector = new Array();
      for (var i = 0 ; i < puntosElipse.length ; i++) {
         vector.push(new THREE.Vector3(puntosElipse[i]['x'], puntosElipse[i]['y'], 5));
      }
      this.spline = new THREE.CatmullRomCurve3(vector);
      this.camino.geometry = new THREE.Geometry().setFromPoints(this.spline.getPoints(100));
   }
 
   update() {
      // Update de la animación
      TWEEN.update();
   }
}
 