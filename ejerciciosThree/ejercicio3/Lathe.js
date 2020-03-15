// Jose Luis Gallego Peña
class Lathe extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);

      // Puntos
      this.points = [];
      this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
      this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
      this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
      this.points.push(new THREE.Vector3(0.5, -0.7, 0.0));
      this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
      this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
      this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
      this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
      this.points.push(new THREE.Vector3(0.5, 0.8, 0.0));
      this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
      this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
      this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
      this.points.push(new THREE.Vector3(0.0, 1.4, 0.0));

      // Un Mesh se compone de geometría y material
      var latheGeom = new THREE.LatheGeometry(this.points, this.guiControls.segments, this.guiControls.phiStart, this.guiControls.phiLength);
      // Como material se crea uno a partir de un color
      var latheMat = new THREE.MeshNormalMaterial();

      // Ya podemos construir el Mesh
      this.lathe = new THREE.Mesh(latheGeom, latheMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.lathe);

      // Para crear una línea visible, como en el vídeo
      var lineGeom = new THREE.Geometry();
      lineGeom.vertices.push(this.points);
      var lineMat = new THREE.LineBasicMaterial({color: 0x0000ff});
      this.line = new THREE.Line(lineGeom, lineMat);
      this.add(this.line);
   }

   createGUI(gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
         this.segments = 10.0;
         this.phiStart = 0.0;
         this.phiLength = 0.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.segments = 10.0;
            this.phiStart = 0.0;
            this.phiLength = 0.0;
         }
      }

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder(titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      var that = this;
      folder.add(this.guiControls, 'segments', 3.0, 30.0, 1.0).name('Resolución : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'phiStart', 0.0, 6.3, 0.1).name('Inicio : ').onChange(function(value){that.cambiarGeometria()}).listen();
      folder.add(this.guiControls, 'phiLength', 0.0, 6.3, 0.1).name('Ángulo : ').onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      this.lathe.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, this.guiControls.phiStart, this.guiControls.phiLength);
   }

   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
   }
}
