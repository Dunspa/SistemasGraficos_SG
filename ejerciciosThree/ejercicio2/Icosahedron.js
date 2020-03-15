// Jose Luis Gallego Peña
class Icosahedron extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Un Mesh se compone de geometría y material
      var icosahedronGeom = new THREE.IcosahedronGeometry(this.guiControls.radius, this.guiControls.detail);
      // Como material se crea uno a partir de un color
      var icosahedronMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      icosahedronMat.flatShading = true;
      icosahedronMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.icosahedron = new THREE.Mesh(icosahedronGeom, icosahedronMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.icosahedron);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = -10.0;
      this.position.y = -10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el radio, la altura y la resolución del cono
      this.guiControls = new function () {
         this.radius = 1.0;
         this.detail = 0.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radius = 1.0;
            this.detail = 0.0;
         }
      }

      // Se crea una sección para los controles del cono
      var folder = gui.addFolder(titleGui);

      // Control de barra
      folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio: ').listen();
      folder.add(this.guiControls, 'detail', 0.0, 3.0, 1.0).name('Resolución: ').listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   update() {
      // Volver a crear la geometría sólo si ha cambiado
      this.icosahedron.geometry = new THREE.IcosahedronGeometry(this.guiControls.radius, this.guiControls.detail);

      // Movimiento continuo del objeto
      this.icosahedron.rotation.z += 0.01;
      this.icosahedron.rotation.y += 0.01;
      this.icosahedron.rotation.x += 0.01;
   }
}
