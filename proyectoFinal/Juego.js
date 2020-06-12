// Todo el juego tiene físicas
class Juego extends Physijs.Scene {
   constructor (myCanvas) {
      // El gestor de hebras
      Physijs.scripts.worker = './physijs/physijs_worker.js'
      // El motor de física de bajo nivel, en el cual se apoya Physijs
      Physijs.scripts.ammo   = './ammo.js'
      
      // Las dos líneas anteriores DEBEN ejecutarse antes de inicializar Physijs.Scene. En este caso, antes de llamar a super
      super();
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.createRenderer(myCanvas);
      
      // Se establece el valor de la gravedad, negativo, los objetos caen hacia abajo
      this.setGravity (new THREE.Vector3 (0, -20, 0));
      
      // Se crean y añaden luces a la escena
      this.createLights();
      
      // Construimos los distinos elementos que tendremos en la escena

      this.createBackground();
      //this.createStones();
      this.createTower();

      // Tutoriales del inicio
      this.tutorial1 = new CartelInformativo("Usa las teclas WASD para moverte\n Puedes empujar rocas moviendote\n hacia ellas\n Pulsa Z para cambiar la cámara");
      this.tutorial1.position.set(-5, 5, -140);
      this.add(this.tutorial1);
      this.tutorial2 = new CartelInformativo("Pulsa la barra espaciadora para saltar\nAl terminar ese salto, ulsala otra vez \npara un doble salto\n Pulsa Q para agacharte");
      this.tutorial2.position.set(-5, 5, -120);
      this.add(this.tutorial2);
      this.tutorial3 = new CartelInformativo("Pulsa la tecla E al estar encima de una\n plataforma como esta para activarla\n Si lo pulsas estando fuera, reiniciarás su \nposición");
      this.tutorial3.position.set(-5, 7, -105);
      this.add(this.tutorial3);
      this.tutorial4 = new CartelInformativo("Pulsa la tecla E al estar\n cerca de una llave para cogerla\n Con ella podrás abrir puertas \nacercándote a ellas y pulsando E");
      this.tutorial4.position.set(12, 5, -135);
      this.add(this.tutorial4);

      // El personaje principal
      this.player = new Jugador(this);
      this.copiaRotation = this.player.rotation.clone();

      // Llaves
      this.key = new Llave();
      this.key.position.set(0, 2, -135);
      this.add(this.key);

      this.key2 = new Llave();
      this.key2.position.set(15, 36, 80);
      this.add(this.key2);

      // Plataformas móviles
      this.startPlatform = new PlataformaMovil(this.player, './imgs/moon.jpg', 'Z', {x: 0.0}, {x: 0.70}, 8000);
      this.startPlatform.posicion(0, 4, -110);
      this.startPlatform.savePosition();
      this.startPlatform.addToScene(this);

      this.movingPlatform1 = new PlataformaMovil(this.player, './imgs/moon.jpg', 'Z', {x: 0.0}, {x: 0.1}, 2000);
      this.movingPlatform1.posicion(-21, 14, 100);
      this.movingPlatform1.savePosition();
      this.movingPlatform1.addToScene(this);

      // Plataformas fijas
      this.platform1 = new Plataforma(this.player, './imgs/stone2.jpg');
      this.platform1.posicion(0, 2, -115);
      this.platform1.addToScene(this);

      this.platform2 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform2.posicion(0, 4, 50);
      this.platform2.addToScene(this);

      this.platformaux = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platformaux.posicion(5, 2, 50);
      this.platformaux.addToScene(this);

      this.platform3 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform3.posicion(0, 4, 60);
      this.platform3.addToScene(this);

      this.platform4 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform4.posicion(0, 4, 70);
      this.platform4.addToScene(this);

      this.platform5 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform5.posicion(-7, 7, 77);
      this.platform5.addToScene(this);

      this.platform6 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform6.posicion(-14, 10, 82);
      this.platform6.addToScene(this);

      this.platform7 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform7.posicion(-19, 12, 90);
      this.platform7.addToScene(this);

      this.platform8 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform8.escala(5, 1, 2);
      this.platform8.posicion(-14, 18, 120);
      this.platform8.addToScene(this);
      this.platform8obst = new Obstaculo('./imgs/rustymetal.jpg', 0.5);
      this.platform8obst.escala(2, 50, 2);
      this.platform8obst.posicion(-10, 25, 120);
      this.platform8obst.addToScene(this);

      this.platform9 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform9.posicion(8, 20, 123);
      this.platform9.addToScene(this);

      this.platform10 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform10.posicion(12, 23, 118);
      this.platform10.addToScene(this);

      this.platform11 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform11.posicion(19, 27, 113);
      this.platform11.addToScene(this);

      this.platform12 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform12.escala(3, 1, 3);
      this.platform12.posicion(25, 31, 100);
      this.platform12.addToScene(this);

      this.platform13 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform13.escala(3, 3, 5);
      this.platform13.posicion(30, 35, 80);
      this.platform13.addToScene(this);
      this.platform13obst = new Obstaculo('./imgs/rustymetal.jpg', 0.5);
      this.platform13obst.escala(3, 25, 1);
      this.platform13obst.posicion(30, 39, 85);
      this.platform13obst.addToScene(this);
      this.platform13obst2 = new Obstaculo('./imgs/rustymetal.jpg', 0.5);
      this.platform13obst2.escala(3, 25, 1);
      this.platform13obst2.posicion(30, 39, 75);
      this.platform13obst2.addToScene(this);

      this.platformkey = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platformkey.posicion(15, 35, 80);
      this.platformkey.addToScene(this);
   
      this.platform14 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform14.posicion(17, 38, 70);
      this.platform14.addToScene(this);

      this.platform15 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform15.posicion(14, 42, 75);
      this.platform15.addToScene(this);

      this.platform16 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform16.posicion(10, 45, 75);
      this.platform16.addToScene(this);

      this.platform17 = new Plataforma(this.player, './imgs/rustymetal.jpg');
      this.platform17.posicion(6, 48, 75);
      this.platform17.addToScene(this);

      this.towertop = new Plataforma(this.player, './imgs/tower.jpg');
      this.towertop.escala(9, 1, 9);
      this.towertop.posicion(0, 49, 100);
      this.towertop.addToScene(this);
      this.towertopobst1 = new Obstaculo('./imgs/moon.jpg', 1);
      this.towertopobst1.escala(3, 50, 2);
      this.towertopobst1.posicion(13, 52, 110);
      this.towertopobst1.addToScene(this);
      this.towertopobst2 = new Obstaculo('./imgs/moon.jpg', 1);
      this.towertopobst2.escala(3, 50, 2);
      this.towertopobst2.posicion(-15, 52, 110);
      this.towertopobst2.addToScene(this);

      this.finalplatform = new Plataforma(this.player, './imgs/moon.jpg');
      this.finalplatform.escala(3, 2, 3);
      this.finalplatform.posicion(0, 55, 160);
      this.finalplatform.final = true;
      this.finalplatform.addToScene(this);
      this.finalplatformobst1 = new Plataforma(this.player, './imgs/moon.jpg');
      this.finalplatformobst1.escala(3, 2, 3);
      this.finalplatformobst1.posicion(0, 43, 125);
      this.finalplatformobst1.addToScene(this);
      this.pared1 = new Plataforma(this.player, './imgs/moon.jpg'); 
      this.pared1.escala(2, 2, 2);
      this.pared1.rotaX(Math.PI/2);
      this.pared1.posicion(0, 42, 135);
      this.pared1.addToScene(this);
      this.finalplatformobst2 = new Plataforma(this.player, './imgs/moon.jpg');
      this.finalplatformobst2.escala(3, 2, 3);
      this.finalplatformobst2.posicion(0, 47, 140);
      this.finalplatformobst2.addToScene(this);
      this.pared2 = new Plataforma(this.player, './imgs/moon.jpg'); 
      this.pared2.escala(2, 2, 2);
      this.pared2.rotaX(Math.PI/2);
      this.pared2.posicion(0, 50, 150);
      this.pared2.addToScene(this);

      this.pared3 = new Plataforma(this.player, './imgs/moon.jpg'); 
      this.pared3.escala(10, 2, 10);
      this.pared3.rotaZ(Math.PI/2);
      this.pared3.posicion(-8, 50, 140);
      this.pared3.addToScene(this);

      this.pared4 = new Plataforma(this.player, './imgs/moon.jpg'); 
      this.pared4.escala(10, 2, 10);
      this.pared4.rotaZ(Math.PI/2);
      this.pared4.posicion(8, 50, 140);
      this.pared4.addToScene(this);

      // Puertas
      this.door1 = new Puerta(this, './imgs/wood.jpg');
      this.door1.posicion(5, 6, 65);
      this.door1.addToScene(this);
      this.door1.createConstraint(this);

      this.door2 = new Puerta(this, './imgs/wood.jpg');
      this.door2.posicion(5, 51, 103);
      this.door2.addToScene(this);
      this.door2.createConstraint(this);

      // Bloques
      this.finalblock = new Bloque(this.player, './imgs/stone3.jpg');
      this.finalblock.escala(9, 5, 9.5);
      this.finalblock.posicion(-8, 53, 90);
      this.finalblock.addToScene(this);
      this.finalblock.createConstraint(this);

      this.finalblock2 = new Bloque(this.player, './imgs/stone3.jpg');
      this.finalblock2.escala(9, 5, 9.5);
      this.finalblock2.posicion(0, 53, 90);
      this.finalblock2.addToScene(this);
      this.finalblock2.createConstraint(this);

      // Tendremos una cámara con un control de movimiento con el ratón
      this.createCamera();

      this.createAudio();

      // Animación del inicio del juego
      var that = this;
      var origen = {x: 800.0};
      var destino = {x: 30.0};
      Juego.ANIMACIONINICIO = new TWEEN.Tween(origen).to(destino, 1000)
         .easing(TWEEN.Easing.Quadratic.InOut)
         .onUpdate (function () {
            that.camera.position.set(that.player.position.x, that.player.position.y + 5, that.player.position.z - origen.x);
            that.camera.up.set(0, 1, 0);
            var look = new THREE.Vector3(that.player.position.x, that.player.position.y, that.player.position.z); 
            that.camera.lookAt(look); 
         })
         .onComplete (function () {
            origen.x = 0.0;
            Juego.START = true;
         });
      
      // Un suelo 
      this.createGround();

      this.tiempoAnterior = Date.now();
   }
  
   createRenderer (myCanvas) {
      // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
      
      // Se instancia un Renderer   WebGL
      this.renderer = new THREE.WebGLRenderer();
      
      // Se establece un color de fondo en las imágenes que genera el render
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
      
      // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      // La visualización se muestra en el lienzo recibido
      $(myCanvas).append(this.renderer.domElement);
   }
   
   /// Método que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
   onWindowResize() {
      this.setCameraAspect (window.innerWidth / window.innerHeight);
      this.renderer.setSize (window.innerWidth, window.innerHeight);
   }

   onKeyDown(event) {
      var tecla = event.which || event.keyCode;

      if (String.fromCharCode(tecla) == "W") {
         this.player.forward = true;
      } else if (String.fromCharCode(tecla) == "A") {
         this.player.left = true;
      } else if (String.fromCharCode(tecla) == "S") {
         this.player.backward = true;
      } else if (String.fromCharCode(tecla) == "D") {
         this.player.right = true;
      } else if (String.fromCharCode(tecla) == "E") {
         if (this.startPlatform.objectOnPlatform) {
            this.startPlatform.startAnimation(this.segundosTranscurridos);
            this.startPlatform.objectOnPlatform = false;
         } else {
            this.startPlatform.restartPosition();
         }

         if (this.movingPlatform1.objectOnPlatform) {
            this.movingPlatform1.startAnimation(this.segundosTranscurridos);
            this.movingPlatform1.objectOnPlatform = false;
         } else {
            this.movingPlatform1.restartPosition();
         }   

         if (Math.abs(Math.abs(this.player.position.z) - (Math.abs(this.door1.position.z))) <= 5) {
            if (document.getElementById("key").getAttribute('src') === "./imgs/key.png") {
               this.door1.openDoor();
               removeKey();
            }
         }

         if (Math.abs(Math.abs(this.player.position.z) - (Math.abs(this.door2.position.z))) <= 5) {
            if (document.getElementById("key").getAttribute('src') === "./imgs/key.png") {
               this.door2.openDoor();
               removeKey();
            } 
         } else {
            this.finalblock.posicion(-8, 53, 90);
            this.finalblock2.posicion(0, 53, 90);
         }
         
         if (Math.abs(Math.abs(this.player.position.z) - (Math.abs(this.key.position.z))) <= 1) {
            this.remove(this.key);
            addKey();
         }

         if (Math.abs(Math.abs(this.player.position.z) - (Math.abs(this.key2.position.z))) <= 1) {
            this.remove(this.key2);
            addKey();
         }
      } else if (String.fromCharCode(tecla) == "Z") {
         this.camerabehind = !this.camerabehind;
      }
   }

   onKeyUp(event) {
      var tecla = event.which || event.keyCode;

      if (String.fromCharCode(tecla) == "W") {
         this.player.forward = false;
      } else if (String.fromCharCode(tecla) == "A") {
         this.player.left = false;
      } else if (String.fromCharCode(tecla) == "S") {
         this.player.backward = false;
      } else if (String.fromCharCode(tecla) == "D") {
         this.player.right = false;
      } else if (String.fromCharCode(tecla) == "Q") {
         this.player.changesize = true;
         if (this.player.maxi) {
            this.player.maxi = false;
         } else {
            this.player.maxi = true;
         }
      }
   }

   onKeyPress(event) {
      var tecla = event.which || event.keyCode;

      if (tecla == 32) {
         this.player.jump = true;

         if (!this.player.jumping) {
            this.player.jumping2 = true;
         }
      } 
   }

   createBackground() {
      var geometry = new THREE.SphereGeometry(200, 30, 30);
      // Como material se crea uno a partir de una textura
      var texture = new THREE.TextureLoader().load('./imgs/fondo.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide});
      this.background = new THREE.Mesh(geometry, material);

      this.add(this.background);
   }

   createTower() {
      var geometry = new THREE.CylinderGeometry(20, 20, 50);
      var texture = new THREE.TextureLoader().load('./imgs/tower.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});
      var physiMaterial = Physijs.createMaterial(material, 1, 0);
      this.tower = new Physijs.CylinderMesh(geometry, physiMaterial, 0);
      
      this.tower.translateZ(100);
      this.tower.translateY(24);

      this.add(this.tower);
   }

   createAudio() {
      var x = document.getElementById("myAudio"); 
      x.play();

      /*// instantiate a listener
      var audioListener = new THREE.AudioListener();

      // add the listener to the camera
      this.camera.add(audioListener);

      // instantiate audio object
      var towerMusic = new THREE.Audio(audioListener);

      // add the audio object to the scene
      this.add(towerMusic);

      // instantiate a loader
      var loader = new THREE.AudioLoader();

      // load a resource
      loader.load(
         // resource URL
         'audio/tower.mp3',

         // onLoad callback
         function (audioBuffer) {
            // set the audio object buffer to the loaded object
            towerMusic.setBuffer(audioBuffer);

            // play the audio
            towerMusic.play();
         },

         // onProgress callback
         function (xhr) {
            //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
         },

         // onError callback
         function (err) {
            console.log('Error en la reproducción de la música');
         }
      );*/
   }
   
   createCamera () {      
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camerabehind = true;
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set(this.player.position.x, this.player.position.y + 5, this.player.position.z - 800);
      this.camera.up.set(0, 1, 0);
      // Y hacia dónde mira
      var look = new THREE.Vector3(this.player.position.x, this.player.position.y, this.player.position.z);
      this.camera.lookAt(look);
      this.add (this.camera);
      
      // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      // Se configuran las velocidades de los movimientos
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      // Debe orbitar con respecto al punto de mira de la cámara
      this.cameraControl.target = look;
   }
   
   createGround() {
      var tamaX = 100;
      var tamaY = 300;
      var resolucion = 30;
      
      var sueloGeometria = new THREE.PlaneGeometry(tamaX, tamaY, resolucion, resolucion);
      // Como material se crea uno a partir de una textura
      var texture = new THREE.TextureLoader().load('./imgs/moon.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});
      var physiMaterial = Physijs.createMaterial(material, 0.2, 0.1);

      // Suelo auxiliar para que no haya errores y el objeto se pueda caer entre los bultos
      var geometry = new THREE.BoxGeometry(tamaX, 10, tamaY);
      var groundAux = new Physijs.BoxMesh(geometry, physiMaterial, 0);
      groundAux.translateY(-5.1);

      // Suelo escarpado
      for (var i = 0 ; i < sueloGeometria.vertices.length ; i++) {
         sueloGeometria.vertices[i].z = Math.floor(Math.random() * 1.1);
      }
      sueloGeometria.computeFaceNormals();
      sueloGeometria.computeVertexNormals();
      var ground = new Physijs.HeightfieldMesh(sueloGeometria, physiMaterial, 0, resolucion, resolucion);
      ground.rotation.x = -Math.PI / 2.0;

      // Paredes del inicio
      geometry = new THREE.BoxGeometry (100, 5, 50);
      var pared1 = new Physijs.BoxMesh (geometry, physiMaterial, 0);
      var pared2 = new Physijs.BoxMesh (geometry, physiMaterial, 0);
      pared1.rotateY(Math.PI/2);
      pared1.rotateX(Math.PI/2);
      pared1.translateZ(0);
      pared1.translateX(110)
      pared1.translateY(-20);
      pared2.rotateY(Math.PI/2);
      pared2.rotateX(Math.PI/2);
      pared2.translateZ(0);
      pared2.translateX(110);
      pared2.translateY(20);

      var that = this;
      ground.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               if (that.player.climbing) {
                  loseHeart();
                  that.player.climbing = false;
               }

               that.startPlatform.objectOnPlatform = false;
               that.movingPlatform1.objectOnPlatform = false;
               that.player.jump = false;
               that.player.jumping = true;
            }
         });

         groundAux.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               if (that.player.climbing) {
                  loseHeart();
                  that.player.climbing = false;
               }

               that.startPlatform.objectOnPlatform = false;
               that.movingPlatform1.objectOnPlatform = false;
               that.player.jump = false;
               that.player.jumping = true;
            }
         });

      this.add(pared1);
      this.add(pared2);
      this.add(groundAux);
      //this.add(ground);
   }
   
   createLights () {
      // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
      // La luz ambiental solo tiene un color y una intensidad
      // Se declara como   var   y va a ser una variable local a este método
      //    se hace así puesto que no va a ser accedida desde otros métodos
      var ambientLight = new THREE.AmbientLight(0xccddee, 0.50);
      // La añadimos a la escena
      this.add (ambientLight);
      
      // Se crea una luz focal que va a ser la luz principal de la escena
      // La luz focal, además tiene una posición, y un punto de mira
      // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
      // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
      this.spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
      this.spotLight.position.set( 60, 60, 40 );
      this.add (this.spotLight);
   }
   
   getCamera () {
      // En principio se devuelve la única cámara que tenemos
      // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
      return this.camera;
   }
   
   setCameraAspect (ratio) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
   }

   updateCamera(){
      if (this.camerabehind) {
         this.camera.position.set(this.player.position.x, this.player.position.y + 5, this.player.position.z - 20); 
      } else {
         this.camera.position.set(this.player.position.x, this.player.position.y + 5, this.player.position.z + 20); 
      }
      
      this.camera.up.set(0, 1, 0);
      var look = new THREE.Vector3(this.player.position.x, this.player.position.y, this.player.position.z); 
      this.camera.lookAt(look); 
   }
   
   update () {
      // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
      // La propia función render es la que indica que quiere ejecutarse la proxima vez
      // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
      requestAnimationFrame(() => this.update());
      
      // Se actualizan los elementos de la escena para cada frame
      // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
      this.spotLight.intensity = 0.5;

      var tiempoActual = Date.now();
      this.segundosTranscurridos = (tiempoActual - this.tiempoAnterior) / 1000.0;
      
      // Se actualiza la posición de la cámara según su controlador
      if (Juego.START) {
         this.cameraControl.update();
         this.updateCamera();
         this.copiaRotation.copy(this.player.rotation);
         this.player.update(this.copiaRotation, this, this.segundosTranscurridos);
      }
      this.background.rotateY(0.0005);

      // Fin del juego
      if (this.finalplatform.endgame) {
         endGame();
      }

      TWEEN.update();

      // Se le pide al motor de física que actualice las figuras según sus leyes
      this.simulate ();

      // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
      this.renderer.render(this, this.getCamera());

      this.tiempoAnterior = tiempoActual;
   }
}

// Constantes que se usan en la clase
Juego.START = false;
Juego.ANIMACIONINICIO;

// Perder una vida
function loseHeart() {
   if (document.getElementById("heart3").getAttribute('src') == "./imgs/heart.png") {
      document.getElementById("heart3").src = "./imgs/emptyheart.png";
   } else if (document.getElementById("heart2").getAttribute('src') == "./imgs/heart.png") {
      document.getElementById("heart2").src = "./imgs/emptyheart.png";
   } else if (document.getElementById("heart1").getAttribute('src') == "./imgs/heart.png") {
      document.getElementById("heart1").src = "./imgs/emptyheart.png";
      
      // Game over
      Juego.START = false;
      document.getElementById("reboot").style.display = "block";
      document.getElementById("WebGL-output").style.opacity = 0.5;
   }
}

// Añadir una llave
function addKey() {
   document.getElementById("key").src = "./imgs/key.png";
}

// Quitar llave
function removeKey() {
   document.getElementById("key").src = "./imgs/nokey.png";
}

// Termina el juego
function endGame() {
   Juego.START = false;
   document.getElementById("endgame").style.display = "block";
   document.getElementById("WebGL-output").style.opacity = 0.5;
}

function reboot() {
   location.reload();
}

function start() {
   document.getElementById("WebGL-output").style.opacity = 1.0;
   document.getElementById("start").style.display = "none";
   document.getElementById("reboot").style.display = "none";

   // Animación TWEEN del inicio
   Juego.ANIMACIONINICIO.start();
}

/// La función principal
$(function () {
   // Se crea la escena
   var scene = new Juego("#WebGL-output");

   // LISTENERS
   
   // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
   window.addEventListener("resize", () => scene.onWindowResize());
   // Listeners para el movimiento del personaje
   window.addEventListener("keydown", (event) => scene.onKeyDown(event), true);
   window.addEventListener("keyup", (event) => scene.onKeyUp(event));
   window.addEventListener("keypress", (event) => scene.onKeyPress(event));
   
   // Finalmente, realizamos el primer renderizado.
   scene.update();
});