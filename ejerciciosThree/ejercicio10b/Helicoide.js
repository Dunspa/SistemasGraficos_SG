// Jose Luis Gallego Peña
class Helicoide extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);
      
      var geomCilindro = new THREE.CylinderGeometry(this.guiControls.radio, this.guiControls.radio, 20.0, 30.0);
      geomCilindro.translate(0.0, 10.0, 0.0);
      var matCilindro = new THREE.MeshNormalMaterial({opacity: 0.35, transparent: true});
      this.cilindro = new THREE.Mesh(geomCilindro, matCilindro);

      var geomEsfera = new THREE.SphereGeometry(2.0, 20.0, 20.0);
      var matEsfera = new THREE.MeshNormalMaterial();
      this.esfera = new THREE.Mesh(geomEsfera, matEsfera);
      this.esfera.translateY(2.0);
      this.esfera.translateX(this.guiControls.radio + 2.0);

      this.helicoide = new THREE.Object3D();
      this.helicoide.add(this.esfera);

      this.arriba = true;  // El movimiento empieza hacia arriba

      this.add(this.cilindro);
      this.add(this.helicoide);
      this.tiempoAnterior = Date.now();
   }

   createGUI(gui, titleGui) {
      this.guiControls = new function () {
         this.radio = 20.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.radio = 20.0;
         }
      }

      // Carpetas
      var that = this;
      var folder = gui.addFolder(titleGui);
      folder.add(this.guiControls, 'radio', 5.0, 30.0, 0.5).name("Radio Cilindro : ").onChange(function(value){that.cambiarGeometria()}).listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }

   cambiarGeometria() {
      // Volver a crear la geometría sólo si ha cambiado
      this.cilindro.geometry = new THREE.CylinderGeometry(this.guiControls.radio, this.guiControls.radio, 20.0, 30.0);
      this.cilindro.geometry.translate(0, 10, 0);
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000.0;

      if (this.helicoide.position.y >= 16.0) {
         this.arriba = false;
      } else if (this.helicoide.position.y <= 0.0) {
         this.arriba = true;
      }
      
      var mov_vertical = 0.01;
      if (!this.arriba) {
         mov_vertical = -0.01;
      }

      this.esfera.position.x = this.guiControls.radio + 2.0;
      this.helicoide.rotation.y += (2*Math.PI / 4.0) * segundosTranscurridos; // Recorrer una vuelta entera (2*PI) en 4 segundos
      this.helicoide.translateY(mov_vertical);

      this.tiempoAnterior = tiempoActual;
   }
}
 