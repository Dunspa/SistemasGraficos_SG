// Jose Luis Gallego Peña
class Cone extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Un Mesh se compone de geometría y material
      var coneGeom = new THREE.ConeGeometry(this.guiControls.radius, this.guiControls.height, this.guiControls.radialSegments);
      // Como material se crea uno a partir de un color
      var coneMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      coneMat.flatShading = true;
      coneMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.cone = new THREE.Mesh(coneGeom, coneMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.cone);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = 10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el radio, la altura y la resolución del cono
      this.guiControls = new function () {
         this.radius = 1.0;
         this.height = 1.0;
         this.radialSegments = 10;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radius = 1.0;
            this.height = 1.0;
            this.radialSegments = 10;
         }
      }

      // Se crea una sección para los controles del cono
      var folder = gui.addFolder(titleGui);

      // Control de barra
      var that = this;
      folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'height', 0.1, 5.0, 0.1).name('Altura : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'radialSegments', 3.0, 20.0, 1.0).name('Resolución : ').onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      // Volver a crear la geometría sólo si ha cambiado
      this.cone.geometry = new THREE.ConeGeometry(this.guiControls.radius, this.guiControls.height, this.guiControls.radialSegments);
   }

   update() {
      // Movimiento continuo del objeto
      this.cone.rotation.z += 0.01;
      this.cone.rotation.y += 0.01;
      this.cone.rotation.x += 0.01;
   }
}
