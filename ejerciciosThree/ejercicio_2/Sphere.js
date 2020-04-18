// Jose Luis Gallego Peña
class Sphere extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Un Mesh se compone de geometría y material
      var sphereGeom = new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments);
      // Como material se crea uno a partir de un color
      var sphereMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      sphereMat.flatShading = true;
      sphereMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.sphere = new THREE.Mesh(sphereGeom, sphereMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.sphere);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = -10.0;
      this.position.y = 10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el radio, la altura y la resolución del cono
      this.guiControls = new function () {
         this.radius = 1.0;
         this.widthSegments = 8.0;
         this.heightSegments = 8.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radius = 1.0;
            this.widthSegments = 8.0;
            this.heightSegments = 8.0;
         }
      }

      // Se crea una sección para los controles del cono
      var folder = gui.addFolder(titleGui);

      // Control de barra
      var that = this;
      folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio: ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'widthSegments', 3.0, 30.0, 1.0).name('Resolución ancho: ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'heightSegments', 3.0, 30.0, 1.0).name('Resolución alto : ').onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      // Volver a crear la geometría sólo si ha cambiado
      this.sphere.geometry = new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments);
   }

   update() {
      // Movimiento continuo del objeto
      this.sphere.rotation.z += 0.01;
      this.sphere.rotation.y += 0.01;
      this.sphere.rotation.x += 0.01;
   }
}
