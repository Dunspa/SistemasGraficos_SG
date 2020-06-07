// Jose Luis Gallego Peña
class Jugador extends ObjetoFisico {
   constructor() {
      super();

      this.object = new Physijs.BoxMesh (   // Caja física
         new THREE.BoxGeometry (1,1,1),   // Caja de Three
         Physijs.createMaterial (   // Material físico
           // Las figuras se crean en modo alambre, cuando colisionen con el suelo cambiarán a color sólido
           new THREE.MeshLambertMaterial ({color: 0xFFFFFF * Math.random(),  wireframe: false}),   // Material de Three
           1.0, 0.0),   // Rozamiento y rebote
         25.0   // Masa
      );
      this.object.scale.set(Math.random()+0.5, Math.random()+0.5, Math.random()+0.5);   // Tamaño final aleatorio

      this.object.position.set (0, 2, -130);
      this.object.rotateY(Math.PI / 2);
         
      this.position.set(this.object.position.x, this.object.position.y, this.object.position.z);

      this.object.colisionable = true;
      this.jump = false;

      /*var that = this;
      var materialLoader = new THREE.MTLLoader();
      var objectLoader = new THREE.OBJLoader();
      materialLoader.load('./models/jackfrost.mtl',
         function(materials) {
            objectLoader.setMaterials(materials);
            objectLoader.load('./models/jackfrost.obj',
               function(object) {
                  that.object = object;
                  //modelo.rotateX(-Math.PI/2);
                  //modelo.scale.set(0.3, 0.3, 0.3);
                  //modelo.translateZ(-5);
                  scene.add(modelo);
               }, null, null);
         });*/
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
         /*if (!this.jumping) {
            var offset = new THREE.Vector3(0, 1, 0);
            this.object.applyCentralImpulse(offset.normalize().multiplyScalar(300));
            this.object.__dirtyPosition = true;
            this.jumping = true;
         } else {
            var offset = new THREE.Vector3(0, -1, 0);
            this.object.applyCentralImpulse(offset.normalize().multiplyScalar(10));
            this.object.__dirtyPosition = true;
         }*/

         if (this.jumping) {
            for (var i = 0 ; i < 20 ; i++) {
               this.object.translateY(0.01);
            }
            this.object.__dirtyPosition = true;

            if (this.object.position.y >= 5) {
               this.jumping = false;
            }
         }
      }

      this.rotation.set(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);
   }

   translateZ(val) {
      this.object.translateZ(val);
      this.object.__dirtyPosition = true;
   }
}