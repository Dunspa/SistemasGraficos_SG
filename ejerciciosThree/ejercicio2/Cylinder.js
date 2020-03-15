// Jose Luis Gallego Peña
class Cylinder extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Un Mesh se compone de geometría y material
      var cylinderGeom = new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom, this.guiControls.height, this.guiControls.radialSegments);
      // Como material se crea uno a partir de un color
      var cylinderMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      cylinderMat.flatShading = true;
      cylinderMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.cylinder);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = 10.0;
      this.position.y = 10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el radio, la altura y la resolución del cono
      this.guiControls = new function () {
         this.radiusTop = 1.0;
         this.radiusBottom = 1.0;
         this.height = 1.0;
         this.radialSegments = 10;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radiusTop = 1.0;
            this.radiusBottom = 1.0;
            this.height = 1.0;
            this.radialSegments = 10;
         }
      }

      // Se crea una sección para los controles del cono
      var folder = gui.addFolder(titleGui);

      // Control de barra
      folder.add(this.guiControls, 'radiusTop', 0.1, 5.0, 0.1).name('Radio Superior: ').listen();
      folder.add(this.guiControls, 'radiusBottom', 0.1, 5.0, 0.1).name('Radio Inferior: ').listen();
      folder.add(this.guiControls, 'height', 0.1, 5.0, 0.1).name('Altura : ').listen();
      folder.add(this.guiControls, 'radialSegments', 3.0, 20.0, 1.0).name('Resolución : ').listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   update() {
      // Volver a crear la geometría sólo si ha cambiado
      this.cylinder.geometry = new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom, this.guiControls.height, this.guiControls.radialSegments);

      // Movimiento continuo del objeto
      this.cylinder.rotation.z += 0.01;
      this.cylinder.rotation.y += 0.01;
      this.cylinder.rotation.x += 0.01;
   }
}
