// Jose Luis Gallego Peña
class Box extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);

      // Un Mesh se compone de geometría y material
      var boxGeom = new THREE.BoxGeometry(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
      // Como material se crea uno a partir de un color
      var boxMat = new THREE.MeshNormalMaterial();
      // Sobreado suave
      boxMat.flatShading = true;
      boxMat.needsUpdate = true;

      // Ya podemos construir el Mesh
      this.box = new THREE.Mesh(boxGeom, boxMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.box);

      // Añadir ejes
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);

      // Posicionamos todo
      this.position.x = -10.0;
   }

   createGUI(gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
         this.sizeX = 1.0;
         this.sizeY = 1.0;
         this.sizeZ = 1.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.sizeX = 1.0;
            this.sizeY = 1.0;
            this.sizeZ = 1.0;
         }
      }

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      var that = this;
      folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]').onChange(function(value){that.cambiarGeometria()}).listen();
   }

   cambiarGeometria() {
      this.box.geometry = new THREE.BoxGeometry(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
   }

   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación

      // Movimiento continuo del objeto
      //this.box.rotation.z += 0.01;
      //this.box.rotation.y += 0.01;
      //this.box.rotation.x += 0.01;
   }
}
