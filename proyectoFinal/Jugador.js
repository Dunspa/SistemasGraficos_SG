// Jose Luis Gallego Peña
class Jugador extends ObjetoFisico {
   constructor(scene) {
      super();

      /*this.object = new Physijs.BoxMesh (   // Caja física
         new THREE.BoxGeometry (1,1,1),   // Caja de Three
         Physijs.createMaterial (   // Material físico
           // Las figuras se crean en modo alambre, cuando colisionen con el suelo cambiarán a color sólido
           new THREE.MeshLambertMaterial ({color: 0xFFFFFF * Math.random(),  wireframe: false}),   // Material de Three
           1.0, 0.0),   // Rozamiento y rebote
         20.0   // Masa
      );
      this.object.scale.set(Math.random()+0.5, Math.random()+0.5, Math.random()+0.5);   // Tamaño final aleatorio*/
      

      var that = this;
      var modelo;
      var materialLoader = new THREE.MTLLoader();
      var objectLoader = new THREE.OBJLoader();
      materialLoader.load('./models/jackfrost.mtl',
         function(materials) {
            objectLoader.setMaterials(materials);
            objectLoader.load('./models/jackfrost.obj',
               function(obj) {
                  that.m = obj;
                  modelo = obj;
                  modelo.translateY(-1.5);
                  modelo.translateZ(-0.2);

                  // Calcular dimensiones del collider correctamente
                  var bounding = new THREE.BoxHelper(modelo);
                  bounding.geometry.computeBoundingBox();
                  var bb = bounding.geometry.boundingBox;
                  geometriaCollider = new THREE.BoxGeometry(bb.max.x-bb.min.x, bb.max.y-bb.min.y, bb.max.z-bb.min.z);

                  // Collider
                  var matInvisible = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
                  matFisico = Physijs.createMaterial(matInvisible, 1.0, 0.0);
                  that.object = new Physijs.BoxMesh(geometriaCollider, matFisico, 25.0);

                  that.object.add(modelo);
                  that.object.position.set(0, 2, -145);
                  //that.object.position.set(0, 70, 100);
         
                  that.position.set(that.object.position.x, that.object.position.y, that.object.position.z);
                  that.scale.set(that.object.scale.x, that.object.scale.y, that.object.scale.z);

                  that.object.colisionable = true;
                  that.climbing = false;
                  that.bajarrapido = true;

                  scene.add(that.object);
               }, null, null);
         });

      this.jump = false;
      this.maxi = true;
   }

   update(copiaRotation, scene, segundosTranscurridos) {
      this.position.set(this.object.position.x, this.object.position.y, this.object.position.z);
      this.object.rotation.copy(copiaRotation);
      this.object.__dirtyRotation = true;
      var velocidadT = 65;
      var velocidadR = 50;

      if (this.forward) {
         this.object.translateZ(0.2 * segundosTranscurridos * velocidadT);
         this.object.__dirtyPosition = true;
      } else if (this.backward) {
         this.object.translateZ(-0.2 * segundosTranscurridos * velocidadT);
         this.object.__dirtyPosition = true;
      }

      if (this.left) {
         this.object.rotateY(0.1 * segundosTranscurridos * velocidadR);
         this.object.__dirtyRotation = true;
      } else if (this.right) {
         this.object.rotateY(-0.1 * segundosTranscurridos * velocidadR);
         this.object.__dirtyRotation = true;
      }

      if (this.jump) {
         /*if (this.jumping) {
            var offset = new THREE.Vector3(0, 1, 0);
            this.object.applyCentralImpulse(offset.normalize().multiplyScalar(80));
            this.object.__dirtyPosition = true;
            
            if (this.object.position.y >= 4) {
               this.jumping = false;
               var offset = new THREE.Vector3(0, -1, 0);
               this.object.applyCentralImpulse(offset.normalize().multiplyScalar(400));
            }
         } else {
            var offset = new THREE.Vector3(0, -1, 0);
            this.object.applyCentralImpulse(offset.normalize().multiplyScalar(10));
            this.object.__dirtyPosition = true;
         }*/

         if (this.jumping) {
            for (var i = 0 ; i < 20 && this.jumping ; i++) {
               this.object.translateY(0.02 * segundosTranscurridos * velocidadT);
               this.object.translateZ(0.015 * segundosTranscurridos * velocidadT);
               this.object.__dirtyPosition = true;
               this.height += 0.015;

               if (this.height >= 4) {
                  this.jumping = false;
               }
            }
         } else if (this.jumping2) {
            for (var i = 0 ; i < 20 && this.jumping2 ; i++) {
               this.object.translateY(0.02 * segundosTranscurridos * velocidadT);
               this.object.translateZ(0.015 * segundosTranscurridos * velocidadT);
               this.object.__dirtyPosition = true;
               this.height += 0.015;

               if (this.height >= 6) {
                  this.jumping2 = false;
               }
            }
         } else {
            if (this.bajarrapido) {
               var bajar = true;
               for (var i = 0 ; i < 20 && bajar ; i++) {
                  this.object.translateY(-0.025 * segundosTranscurridos * velocidadT);
                  this.object.translateZ(0.015 * segundosTranscurridos * velocidadT);
                  this.object.__dirtyPosition = true;
                  this.height -= 0.02;

                  if (this.height == 0) {
                     bajar = false;
                  }
               }
            }
         }
      } else {
         this.height = 0;
      }

      this.rotation.set(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);

      // Poder escalar un objeto en Physijs, que no lo permite, creando un nuevo objeto
      if (this.changesize) {
         if (this.maxi) {
            this.maxim(scene);
         } else {
            this.mini(scene);
         }
      }

      this.changesize = false;
   }

   maxim(scene) {
      this.maxi = true;
      scene.remove(this.object);

      this.object = new Physijs.BoxMesh(geometriaCollider, matFisico, 25.0);
      this.object.scale.copy(this.scale);
      this.object.position.copy(this.position);
      this.object.add(this.m);
      this.object.colisionable = true;
      scene.add(this.object);
   }

   mini(scene) {
      this.maxi = false;
      scene.remove(this.object);

      this.object = new Physijs.BoxMesh(geometriaCollider, matFisico, 25.0);
      this.object.scale.copy(this.scale);
      this.object.scale.set(1, this.object.scale.y/4, 1);
      this.object.position.copy(this.position);
      this.object.add(this.m);
      this.object.colisionable = true;
      scene.add(this.object);
   }
}

var modelo;
var geometriaCollider;
var matFisico;