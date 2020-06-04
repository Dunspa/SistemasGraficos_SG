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
      this.setGravity (new THREE.Vector3 (0, -10, 0));
      
      // Para almacenar las figuras que caen
      this.boxes = [];
      this.spheres = [];
      this.todos = [];
      
      // Raycaster que se usará para elegir (pick) las figuras que se empujarán
      this.raycaster = new THREE.Raycaster();
      
      // Se crea la gui
      this.createGUI();
      
      // Construimos los distinos elementos que tendremos en la escena
      
      // Se crean y añaden luces a la escena
      this.createLights();
      
      // IMPORTANTE: Los elementos que se desee sean tenidos en cuenta en la FISICA deben colgar DIRECTAMENTE de la escena. NO deben colgar de otros nodos.

      this.createBackground();

      // El personaje principal
      this.createPlayer();

      // Tendremos una cámara con un control de movimiento con el ratón
      this.createCamera();

      //var constraint = new Physijs.DOFConstraint(this.player, this.playerjump, this.player.position);
      //this.addConstraint(constraint);
      //constraint.setLinearUpperLimit(new THREE.Vector3(10000000000, 5, 10000000000));
      
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

   // Se procesa, o el movimiento de cámara, con Ctrl; o los impulsos a las figuras.
   onMouseDown(event) {
      if (event.ctrlKey) {
         // Para hacer órbita hay que mantener pulsado Ctrl
         //this.cameraControl.enabled = true;
      } else {
         //this.cameraControl.enabled = false;
         // Se usa el clic para impulsar cajas y esferas
         this.pushBox (event);
      }
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
      } else if (tecla == 32) {
         this.player.jump = true;
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
      } else if (tecla == 32) {
         this.player.jump = false;
      }
   }

   createBackground() {
      var geometry = new THREE.SphereGeometry(70, 30, 30);
      // Como material se crea uno a partir de una textura
      var texture = new THREE.TextureLoader().load('./imgs/night.png');
      var material = new THREE.MeshPhongMaterial({map: texture, side: THREE.BackSide});
      this.background = new THREE.Mesh(geometry, material);

      this.add(this.background);
   }

   createPlayer() {
      this.player = new Physijs.BoxMesh (   // Caja física
         new THREE.BoxGeometry (1,1,1),   // Caja de Three
         Physijs.createMaterial (   // Material físico
           // Las figuras se crean en modo alambre, cuando colisionen con el suelo cambiarán a color sólido
           new THREE.MeshLambertMaterial ({color: 0xFFFFFF * Math.random(),  wireframe: false}),   // Material de Three
           1.0, 0.0),   // Rozamiento y rebote
         1.0   // Masa
      );
      this.player.scale.set(Math.random()+0.5, Math.random()+0.5, Math.random()+0.5);   // Tamaño final aleatorio
      this.boxes.push(this.player);      
      this.todos.push(this.player);

      this.player.position.set (0, 2, -40);
      this.player.rotateY(Math.PI / 2);

      this.playerjump = new Physijs.BoxMesh (   // Caja física
         new THREE.BoxGeometry (1,0.1,1),   // Caja de Three
         Physijs.createMaterial (   // Material físico
           // Las figuras se crean en modo alambre, cuando colisionen con el suelo cambiarán a color sólido
           new THREE.MeshLambertMaterial ({wireframe: false, opacity: 0, transparent: true}),   // Material de Three
           1.0, 0.0),   // Rozamiento y rebote
         1.0   // Masa
      );
      this.playerjump.translateY(-0.1);

      // A las figuras se le añaden un atributo  colisionable  para indicar que estas figuras son colisionables
      this.player.colisionable = true;
      // Las figuras con física deben estar DIRECTAMENTE colgadas en la escena.
      this.add(this.player);
      this.add(this.playerjump);

      // Se construyen las restricciones
      //var constraint = new Physijs.DOF

      // Se añaden las restricciones a la escena

      // Se configuran las restricciones
   }
   
   createCamera () {      
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set(this.player.position.x, this.player.position.y + 10, this.player.position.z - 10);
      // Y hacia dónde mira
      var look = this.player.position;
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
      var tamaX = 150;
      var tamaY = 150;
      var resolucion = 50;
      
      var sueloGeometria = new THREE.PlaneGeometry(tamaX, tamaY, resolucion, resolucion);
      // Como material se crea uno a partir de una textura
      var texture = new THREE.TextureLoader().load('./imgs/moon.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});
      var physiMaterial = Physijs.createMaterial(material, 0.2, 0.1);

      // Suelo auxiliar para que no haya errores y el objeto se pueda caer entre los bultos
      var geometry = new THREE.BoxGeometry(tamaX, 10, tamaY);
      var groundAux = new Physijs.BoxMesh(geometry, physiMaterial, 0);
      groundAux.translateY(-5.01);

      // Suelo escarpado
      for (var i = 0 ; i < sueloGeometria.vertices.length ; i++) {
         sueloGeometria.vertices[i].z = Math.floor(Math.random() * 1.1);
      }
      sueloGeometria.computeFaceNormals();
      sueloGeometria.computeVertexNormals();
      var ground = new Physijs.HeightfieldMesh(sueloGeometria, physiMaterial, 0, resolucion, resolucion);
      ground.rotation.x = -Math.PI / 2.0;

      this.add(groundAux);
      this.add(ground);
   }

   createGameOver() {
      // Al segundo suelo se le añade un listener de colisiones para identificar un game over
      ground.addEventListener ('collision',
         function (o,v,r,n) {
            if (o.colisionable)
               o.material.wireframe = false;
         }
      );
   }
   
   createGUI () {
      // Se crea una interfaz gráfica de usuario vacia
      var gui = new dat.GUI();
   
      var that = this;
      // Se definen los controles que se modificarán desde la GUI
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
         // En el contexto de una función   this   alude a la función
         this.lightIntensity = 0.5;
         this.push = 1.0;   // La fuerza de los empujones que se le dan a las figuras
      }

      gui.add (this.guiControls, 'push', -10, 10, 1).name ('Fuerza');
      
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');    
   }
   
   createLights () {
      // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
      // La luz ambiental solo tiene un color y una intensidad
      // Se declara como   var   y va a ser una variable local a este método
      //    se hace así puesto que no va a ser accedida desde otros métodos
      var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
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
   
   
   // Una función para empujar o tirar de las figuras
   
   pushBox (event) {
      // Es el ratón el que empuja o tira
      
      // Se construye un rayo a partir de la posición del ratón (igual que se hacía con el Picking)
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
      this.raycaster.setFromCamera (mouse, this.getCamera());
      
      // Se busca si hay alguna figura apuntada por el ratón, igual que el Picking
      var pickedObjects = this.raycaster.intersectObjects(this.todos);
      if (pickedObjects.length > 0) {
         // Hay un objeto apuntado por el ratón
         var objeto = pickedObjects[0].object;
         // Se obtiene en qué punto de su superficie se ha clicado
         var pickedPoint = pickedObjects[0].point.clone();
         // Con ese punto y el centro del objeto se hace el vector que determina la dirección del impulso
         var offset = pickedPoint.sub(objeto.position).negate();
         // La fuerza la obtenemos de la interfaz, un escalar, lo usamos para hacer que el vector del impulso tenga la dirección calculada pero que su módulo sea la fuerza leída de la gui
         var effect = offset.normalize().multiplyScalar(this.guiControls.push);
         objeto.applyCentralImpulse (effect);
      }
         
   }
   
   setCameraAspect (ratio) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
   }
   
   update () {
      // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
      // La propia función render es la que indica que quiere ejecutarse la proxima vez
      // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
      requestAnimationFrame(() => this.update());
      
      // Se actualizan los elementos de la escena para cada frame
      // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
      this.spotLight.intensity = this.guiControls.lightIntensity;
      
      // Se actualiza la posición de la cámara según su controlador
      this.cameraControl.update();

      //this.camera.position.set(this.player.position.x - (200 * Math.sin(this.camera.rotation.x)), this.player.position.y + 50, this.player.position.z - (200 * Math.cos(this.camera.rotation.z)));

      if (this.player.forward) {
         this.player.translateZ(0.1);
         this.player.__dirtyPosition = true;
      } else if (this.player.backward) {
         this.player.translateZ(-0.1);
         this.player.__dirtyPosition = true;
      }

      if (this.player.left) {
         this.player.rotateY(0.1);
         this.player.__dirtyRotation = true;
      } else if (this.player.right) {
         this.player.rotateY(-0.1);
         this.player.__dirtyRotation = true;
      }

      if (this.player.jump) {
         var offset = new THREE.Vector3(0, 1, 0);
         this.player.applyCentralImpulse(offset.normalize().multiplyScalar(5));
         this.player.__dirtyPosition;
      }

      this.camera.position.set(this.player.position.x, this.player.position.y + 1, this.player.position.z - 10);
      this.camera.up.set(0, 1, 0);
      
      // Se le pide al motor de física que actualice las figuras según sus leyes
      this.simulate ();
      
      // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
      this.renderer.render(this, this.getCamera());
   }
}

// Constantes que se usan en la clase


/// La función principal
$(function () {
  // Se crea la escena
  var scene = new Juego("#WebGL-output");
  
  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", () => scene.onWindowResize());
  // Definimos un listener para el mouse down del ratón para los impulsos a las figuras
  window.addEventListener ("mousedown", () => scene.onMouseDown(event), true);
  // Listeners para el movimiento del personaje
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event), true);
  window.addEventListener ("keyup", () => scene.onKeyUp(event));
  
  // Finalmente, realizamos el primer renderizado.
  scene.update();
});

