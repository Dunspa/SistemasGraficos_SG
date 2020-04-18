// Jose Luis Gallego Peña
class Satelites extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Se crea la parte de la interfaz
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui, titleGui);
      
      // El material de los planetas se hará con texturas
      var cargadorTexturas = new THREE.TextureLoader();
      var texturaTierra = cargadorTexturas.load('../imgs/tierra.jpg');
      var materialTierra = new THREE.MeshPhongMaterial({map: texturaTierra});
      var texturaCara = cargadorTexturas.load('../imgs/cara.jpg');
      var materialCara = new THREE.MeshPhongMaterial({map: texturaCara});

      var geomTierra = new THREE.SphereGeometry(5, 20, 20);
      this.planetaTierra = new THREE.Mesh(geomTierra, materialTierra);
      this.planetaTierra.translateY(5);

      var geomCara = new THREE.SphereGeometry(3, 20, 20);
      this.cara1a = new THREE.Mesh(geomCara, materialCara);
      this.cara1b = new THREE.Object3D();
      this.cara1b.translateX(10);
      this.cara1b.translateY(5);
      this.cara1b.add(this.cara1a);
      this.planetaCara1 = new THREE.Object3D();
      this.planetaCara1.add(this.cara1b);      

      var geomCara2 = new THREE.SphereGeometry(3, 20, 20);
      geomCara2.rotateY(-Math.PI/2);
      this.cara2a = new THREE.Mesh(geomCara2, materialCara);
      this.cara2b = new THREE.Object3D();
      this.cara2b.translateX(20);
      this.cara2b.translateY(5);
      this.cara2b.add(this.cara2a);
      this.planetaCara2 = new THREE.Object3D();
      this.planetaCara2.add(this.cara2b);

      this.cara3a = new THREE.Mesh(geomCara, materialCara);
      this.cara3b = new THREE.Object3D();
      this.cara3b.translateX(30);
      this.cara3b.translateY(5);
      this.cara3b.add(this.cara3a);
      this.planetaCara3 = new THREE.Object3D();
      this.planetaCara3.add(this.cara3b);

      this.add(this.planetaTierra);
      this.add(this.planetaCara1);
      this.add(this.planetaCara2);
      this.add(this.planetaCara3);
      this.tiempoAnterior = Date.now();
   }

   createGUI(gui, titleGui) {
      this.guiControls = new function () {
         // Un botón para dejarlo todo en su posición inicial
         // Cuando se pulse se ejecutará esta función.
         this.reset = function () {
         }
      }

      // Carpetas
      var folder = gui.addFolder(titleGui);

      folder.add(this.guiControls, 'reset').name('[ Reset ]');
   }
 
   update(posCamara) {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      var tiempoActual = Date.now();
      var segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000.0;

      this.planetaTierra.rotation.y += segundosTranscurridos; // Giro sobre si mismo

      this.planetaCara1.rotation.y += segundosTranscurridos; // Giro alrededor del eje
      this.cara1a.rotation.y = -Math.PI; // Mirando siempre a la tierra

      this.planetaCara2.rotation.y += segundosTranscurridos; // Giro alrededor del eje
      this.cara2a.lookAt(posCamara); // Mirando siempre a la cámara;

      this.planetaCara3.rotation.y += segundosTranscurridos;  // Giro alrededor del eje
      this.cara3a.rotation.y += segundosTranscurridos; // Giro sobre si mismo
   
      this.tiempoAnterior = tiempoActual;
   }
}
 