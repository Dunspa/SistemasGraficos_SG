// Todo el juego tiene físicas
class Juego extends Physijs.Scene {
   constructor (myCanvas) {
      // El gestor de hebras
      Physijs.scripts.worker = './physijs/physijs_worker.js'
      // El motor de física de bajo nivel, en el cual se apoya Physijs
      Physijs.scripts.ammo   = './ammo.js'
      
      // Las dos líneas anteriores DEBEN ejecutarse antes de inicializar Physijs.Scene. En este caso, antes de llamar a super
      super();

      /*this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(stats.dom);*/
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.createRenderer(myCanvas);
      
      // Se establece el valor de la gravedad, negativo, los objetos caen hacia abajo
      this.setGravity (new THREE.Vector3 (0, -20, 0));
      
      // Para almacenar las figuras que caen
      this.boxes = [];
      this.spheres = [];
      this.todos = [];
      
      // Raycaster que se usará para elegir (pick) las figuras que se empujarán
      this.raycaster = new THREE.Raycaster();
      
      // Construimos los distinos elementos que tendremos en la escena
      
      // Se crean y añaden luces a la escena
      this.createLights();
      
      // IMPORTANTE: Los elementos que se desee sean tenidos en cuenta en la FISICA deben colgar DIRECTAMENTE de la escena. NO deben colgar de otros nodos.

      this.createBackground();
      //this.createStones();
      this.createTower();

      // Tutoriales del inicio
      this.tutorial1 = new CartelInformativo("Usa las teclas WASD \npara moverte");
      this.tutorial1.position.set(-5, 3, -140);
      this.add(this.tutorial1);
      this.tutorial2 = new CartelInformativo("Pulsa la barra\n espaciadora para saltar");
      this.tutorial2.position.set(-5, 4, -120);
      this.add(this.tutorial2);
      this.tutorial3 = new CartelInformativo("Pulsa la tecla E al estar \nencima de una plataforma como\n esta para activarla");
      this.tutorial3.position.set(-5, 7, -105);
      this.add(this.tutorial3);
      this.tutorial4 = new CartelInformativo("Pulsa la tecla E al estar\n cerca de una llave para cogerla\n Con ella podrás abrir puertas \nacercándote a ellas y pulsando E");
      this.tutorial4.position.set(12, 5, -125);
      this.add(this.tutorial4);

      this.key = new Llave();
      this.key.position.set(0, 2, -130);
      this.add(this.key);

      // El personaje principal
      this.player = new Jugador(this);
      this.copiaRotation = this.player.rotation.clone();

      this.startPlatform = new PlataformaMovil(this.player, './imgs/stone2.jpg', 'Z', {x: 0.0}, {x: 0.7}, 8000);
      this.startPlatform.posicion(0, 4, -110);
      this.startPlatform.addToScene(this);

      this.platform1 = new Plataforma(this.player, './imgs/stone2.jpg');
      this.platform1.posicion(0, 2, -115);
      this.platform1.addToScene(this);
   
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
            this.startPlatform.startAnimation();
         }
         
         if (Math.abs(this.player.position.z) - (Math.abs(this.key.position.z)) <= 1) {
            this.remove(this.key);
            addKey();
         }
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

   createStones() {
      var element = null;
      
      for (var i = 0 ; i < 10 ; i++) {
         // Textura aleatoria
         if (i % 2 == 0) {
            var texture = new THREE.TextureLoader().load('./imgs/stone1.jpg');
         } else {
            var texture = new THREE.TextureLoader().load('./imgs/stone2.jpg');
         }

         element = new Physijs.BoxMesh (
            new THREE.BoxGeometry (1,1,1),
            Physijs.createMaterial(
               new THREE.MeshLambertMaterial({map: texture}), 
               1, 0),
            20.0
         );

         element.scale.set(Math.random()+1, Math.random()+2, Math.random()+1);
         element.position.set(Math.floor(Math.random() * (50 - -59) ) + -50, 0, -130);
         element.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2);

         element.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               that.startPlatform.objectOnPlatform = false;
               that.player.jump = false;
               that.player.jumping = true;
            }
         });
         
         this.add (element);
      }
   }

   createTower() {
      var geometry = new THREE.CylinderGeometry(20, 20, 100);
      var texture = new THREE.TextureLoader().load('./imgs/tower.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});
      var physiMaterial = Physijs.createMaterial(material, 1.0, 0.0);
      this.tower = new Physijs.CylinderMesh(geometry, physiMaterial, 0);
      
      this.tower.translateZ(100);
      this.tower.translateY(50);

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
               that.startPlatform.objectOnPlatform = false;
               that.player.jump = false;
               that.player.jumping = true;
            }
         });

      pared1.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               loseHeart();
            }
         });
      
      pared2.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               loseHeart();
            }
         });

      this.add(pared1);
      this.add(pared2);
      this.add(groundAux);
      this.add(ground);
   }

   createGameOver() {
      // Al segundo suelo se le añade un listener de colisiones para identificar un game over
      ground.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable)
               o.material.wireframe = false;
         }
      );
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
      this.camera.position.set(this.player.position.x, this.player.position.y + 5, this.player.position.z - 20); 
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
      
      // Se actualiza la posición de la cámara según su controlador
      if (Juego.START) {
         this.cameraControl.update();
         this.updateCamera();
         this.copiaRotation.copy(this.player.rotation);
         this.player.update(this.copiaRotation, this);
      }
      this.background.rotateY(0.0005);

      TWEEN.update();
      
      // Se le pide al motor de física que actualice las figuras según sus leyes
      this.simulate ();

      // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
      this.renderer.render(this, this.getCamera());
      
      /*var that = this;
      onRenderFcts.push(function() {
         // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
         that.renderer.render(this, this.getCamera());
         that.stats.update();
      })*/
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
      document.getElementById("reboot").innerHTML = "<h1>GAME OVER ¿Reiniciar?</h1>";
      document.getElementById("WebGL-output").style.opacity = 0.5;
   }
}

// Añadir una llave
function addKey() {
   document.getElementById("key").src = "./imgs/key.png";
}

// Eliminar una llave al usarla
function removeKey() {
   document.getElementById("key").src = "./imgs/nokey.png";
}

/// La función principal
$(function () {
   // Se crea la escena
   var scene = new Juego("#WebGL-output");

   // LISTENERS
   
   // Se inicia el juego
   document.getElementById("start").addEventListener("click", function () {
      document.getElementById("WebGL-output").style.opacity = 1.0;
      document.getElementById("start").style.display = "none";
      document.getElementById("reboot").style.display = "none";

      // Animación TWEEN del inicio
      Juego.ANIMACIONINICIO.start();
   });

   document.getElementById("reboot").addEventListener("click", function() {
      location.reload();
   });
   
   // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
   window.addEventListener("resize", () => scene.onWindowResize());
   // Listeners para el movimiento del personaje
   window.addEventListener("keydown", (event) => scene.onKeyDown(event), true);
   window.addEventListener("keyup", (event) => scene.onKeyUp(event));
   window.addEventListener("keypress", (event) => scene.onKeyPress(event));
   
   // Finalmente, realizamos el primer renderizado.
   scene.update();
});