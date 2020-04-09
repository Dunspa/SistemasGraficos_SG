// Jose Luis Gallego Peña
class Pendulos extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();
      
      // Se crea la parte de la interfaz
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);

      // Creación de la geometría del péndulo pequeño
      var geomPendulo2 = new THREE.BoxGeometry(1.2, 10, 1);
      geomPendulo2.translate(0, -5, 1.5);
      var matPendulo2 = new THREE.MeshPhongMaterial({color: "#0000ff"});
      this.p2a = new THREE.Mesh(geomPendulo2, matPendulo2);

      var contornoEje = new THREE.Shape();
      contornoEje.absarc(0, 0.25, 0.25, 0, 2 * Math.PI);
      var opciones = {depth: 0.3, bevelEnabled: false};
      var geomEje = new THREE.ExtrudeGeometry(contornoEje, opciones);
      geomEje.translate(0, -0.25, 2);
      var matEje2 = new THREE.MeshPhongMaterial({color: "#006600"});
      this.eje2 = new THREE.Mesh(geomEje, matEje2);

      // Formar nodos del modelo jerárquico
      this.p2b = new THREE.Object3D();
      this.p2b.translateY(1);
      this.p2b.add(this.p2a);
      this.pendulo2 = new THREE.Object3D();
      this.pendulo2.add(this.p2b);
      this.pendulo2.add(this.eje2);

      // Creación de la geometría del péndulo grande
      var geomParteMovil = new THREE.BoxGeometry(2, 5, 2);
      geomParteMovil.translate(0, -2.5, 0);
      var matParteMovil = new THREE.MeshPhongMaterial({color: "#ff0000"});
      this.parteMovil = new THREE.Mesh(geomParteMovil, matParteMovil);
      this.parteMovil.translateY(-2);

      var geomParteFija = new THREE.BoxGeometry(2, 4, 2);
      var matParteFija = new THREE.MeshPhongMaterial({color: "#00ff00"});
      this.parteFijaSup = new THREE.Mesh(geomParteFija, matParteFija);
      this.parteFijaInf = new THREE.Mesh(geomParteFija, matParteFija);

      contornoEje.absarc(0, 0.7, 0.7, 0, 2 * Math.PI);
      geomEje = new THREE.ExtrudeGeometry(contornoEje, opciones);
      geomEje.translate(0, -0.7, 1);
      var matEje1 = new THREE.MeshPhongMaterial({color: "#ffc0cb"});
      this.eje1 = new THREE.Mesh(geomEje, matEje1);

      // Formar nodos del modelo jerárquico
      this.pendulo1 = new THREE.Object3D;
      this.pendulo1.add(this.parteMovil);
      this.pendulo1.add(this.parteFijaSup);
      this.pendulo1.add(this.parteFijaInf);
      this.pendulo1.add(this.eje1);
      this.pendulo1.add(this.pendulo2);

      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.pendulo1);
   }

   createGUI(gui, titleGui) {
      this.guiControls = new function () {
         this.h1 = 5.0;
         this.alfa1 = 0.0;

         this.h2 = 10.0;
         this.alfa2 = 0.0;
         this.p = 10.0;

         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
            this.h1 = 5.0;
            this.alfa1 = 0.0;

            this.h2 = 10.0;
            this.alfa2 = 0.0;
            this.p = 10.0;
         }
      }

      // Carpetas
      var folder = gui.addFolder(titleGui);
      var folder1 = gui.addFolder("Péndulo grande");
      var folder2 = gui.addFolder("Péndulo pequeño");

      var that = this;
      folder1.add(this.guiControls, 'h1', 5.0, 10.0, 0.1).name('Longitud : ').listen();
      folder1.add(this.guiControls, 'alfa1', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();

      folder2.add(this.guiControls, 'h2', 10.0, 20.0, 0.1).name('Longitud : ').listen();
      folder2.add(this.guiControls, 'alfa2', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();
      folder2.add(this.guiControls, 'p', 10.0, 90.0, 1.0).name('Posicion (%) : ').listen();

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }
 
   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.parteMovil.scale.y = this.guiControls.h1 / 5.0; // Longitud del péndulo superior
      this.pendulo1.rotation.z = this.guiControls.alfa1; // Oscilación del péndulo superior
      this.parteFijaInf.position.y = -this.guiControls.h1 - 4.0;

      this.p2b.scale.y = this.guiControls.h2 / 10.0;  // Longitud del péndulo inferior
      this.pendulo2.rotation.z = this.guiControls.alfa2; // Oscilación del péndulo inferior
      this.pendulo2.position.y = - 2 - ((this.guiControls.p * this.guiControls.h1) / 100); // Posición del eje del péndulo inferior
   }
}
 