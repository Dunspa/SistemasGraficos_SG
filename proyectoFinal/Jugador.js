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
                  var modelo = obj;
                  modelo.translateY(-1.5);
                  modelo.translateZ(-0.2);

                  // Calcular dimensiones del collider correctamente
                  var bounding = new THREE.BoxHelper(modelo);
                  bounding.geometry.computeBoundingBox();
                  var bb = bounding.geometry.boundingBox;
                  var geometriaCollider = new THREE.BoxGeometry(bb.max.x-bb.min.x, bb.max.y-bb.min.y, bb.max.z-bb.min.z);

                  // Collider
                  var matInvisible = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5});
                  var matFisico = Physijs.createMaterial(matInvisible, 1.0, 0.0);
                  that.object = new Physijs.BoxMesh(geometriaCollider, matFisico, 25.0);

                  that.object.add(modelo);

                  that.copiaScale = that.object.scale.clone(); // Guardar tamaño base

                  that.object.position.set (0, 2, -130);
                  that.object.rotateY(Math.PI / 2);
         
                  that.position.set(that.object.position.x, that.object.position.y, that.object.position.z);

                  that.object.colisionable = true;

                  scene.add(that.object);
               }, null, null);
         });

      this.jump = false;
      this.maxi = true;
   }

   update(copiaRotation) {
      this.position.set(this.object.position.x, this.object.position.y, this.object.position.z);
      this.object.rotation.copy(copiaRotation);
      this.object.__dirtyRotation = true;

      if (this.forward) {
         this.object.translateZ(0.1);
         this.object.__dirtyPosition = true;
      } else if (this.backward) {
         this.object.translateZ(-0.1);
         this.object.__dirtyPosition = true;
      }

      if (this.left) {
         this.object.rotateY(0.1);
         this.object.__dirtyRotation = true;
      } else if (this.right) {
         this.object.rotateY(-0.1);
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
               this.object.translateY(0.01);
               this.object.__dirtyPosition = true;
               this.height += 0.01;

               if (this.height >= 4) {
                  this.jumping = false;
               }
            }
         } else {
            var bajar = true;
            for (var i = 0 ; i < 20 && bajar ; i++) {
               console.log("jola");
               this.object.translateY(-0.01);
               this.object.__dirtyPosition = true;
               this.height -= 0.01;

               if (this.height = 0) {
                  bajar = false;
               }
            }
         }
      } else {
         this.height = 0;
      }

      this.rotation.set(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);
   }

   maxim() {
      this.maxi = true;
      this.object.scale.copy(this.copiaScale);
   }

   mini() {
      this.maxi = false;
      this.object.scale.set(this.copiaScale.x/4, this.copiaScale.y/4, this.copiaScale.z/4);
      this.object.translateY(-1);
      this.object.__dirtyPosition = true;
   }
}