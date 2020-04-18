// Jose Luis Gallego Peña
class Torus extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Un Mesh se compone de geometría y material
      var torusGeom = new THREE.TorusGeometry(this.guiControls.radius, this.guiControls.tube, this.guiControls.radialSegments, this.guiControls.tubularSegments);
      // Como material se crea uno a partir de un color
      var torusMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      torusMat.flatShading = true;
      torusMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.torus = new THREE.Mesh(torusGeom, torusMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.torus);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = 10.0;
      this.position.y = -10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el radio, la altura y la resolución del cono
      this.guiControls = new function () {
         this.radius = 1.0;
         this.tube = 1.0;
         this.radialSegments = 3.0;
         this.tubularSegments = 3.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radius = 1.0;
            this.tube = 1.0;
            this.radialSegments = 3.0;
            this.tubularSegments = 3.0;
         }
      }

      // Se crea una sección para los controles del cono
      var folder = gui.addFolder(titleGui);

      // Control de barra
      var that = this;
      folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio: ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'tube', 0.1, 5.0, 0.1).name('Tubo: ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'radialSegments', 3.0, 20.0, 1.0).name('Resolución radio : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'tubularSegments', 3.0, 20.0, 1.0).name('Resolución tubo : ').onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      // Volver a crear la geometría sólo si ha cambiado
      this.torus.geometry = new THREE.TorusGeometry(this.guiControls.radius, this.guiControls.tube, this.guiControls.radialSegments, this.guiControls.tubularSegments);
   }

   update() {
      // Movimiento continuo del objeto
      this.torus.rotation.z += 0.01;
      this.torus.rotation.y += 0.01;
      this.torus.rotation.x += 0.01;
   }
}
