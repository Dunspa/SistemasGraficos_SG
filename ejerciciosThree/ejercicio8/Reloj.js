// Jose Luis Gallego Peña
class Reloj extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();
      
      // Se crea la parte de la interfaz
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      var alfa = (2 * Math.PI) / 12.0;
      var angulo = 0;
      this.radio = 20;
      var geomEsfera = new THREE.SphereGeometry(1, 20, 20);
      var matEsfera = new THREE.MeshPhongMaterial({color: "#ff0000"});

      this.r2 = new THREE.Mesh(geomEsfera, matEsfera);
      this.r2.translateX(this.radio - 3);

      this.reloj = new THREE.Object3D();
      this.reloj.add(this.r2);
      this.add(this.reloj);
      // Al crear el objeto medimos el tiempo actual en milisegundos
      this.tiempoAnterior = Date.now();
      
      // Crear círculo compuesto por 12 esferas verdes
      matEsfera = new THREE.MeshPhongMaterial({color: "#00ff00"});
      this.esferas = new Array();
      for (var i = 0 ; i < 12 ; i++) {
         this.esferas.push(new THREE.Mesh(geomEsfera, matEsfera));
         this.esferas[i].translateX(Math.cos(angulo) * this.radio)
         this.esferas[i].translateZ(-Math.sin(angulo) * this.radio);
         this.add(this.esferas[i]);
         angulo += alfa;
      }
   }

   createGUI(gui, titleGui) {
      this.guiControls = new function () {
         this.velocidad = 1.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.velocidad = 1.0;
         }
      }

      // Carpetas
      var folder = gui.addFolder(titleGui);

      folder.add(this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name("Velocidad (marcas/s) : ").listen();
      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000.0; // Tiempo en segundos

      this.reloj.rotation.y += this.guiControls.velocidad * ((2 * Math.PI) / 12.0) * segundosTranscurridos;

      this.tiempoAnterior = tiempoActual;
   }
}
 