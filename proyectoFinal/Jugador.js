// Jose Luis Gallego Peña
class Jugador extends THREE.Object3D {
   constructor(scene) {
      super();

      this.player = new Physijs.BoxMesh (   // Caja física
         new THREE.BoxGeometry (1,1,1),   // Caja de Three
         Physijs.createMaterial (   // Material físico
           // Las figuras se crean en modo alambre, cuando colisionen con el suelo cambiarán a color sólido
           new THREE.MeshLambertMaterial ({color: 0xFFFFFF * Math.random(),  wireframe: false}),   // Material de Three
           1.0, 0.0),   // Rozamiento y rebote
         25.0   // Masa
      );
      this.player.scale.set(Math.random()+0.5, Math.random()+0.5, Math.random()+0.5);   // Tamaño final aleatorio

      this.player.position.set (0, 0, -130);
      this.player.rotateY(Math.PI / 2);
         
      this.position.set(this.player.position.x, this.player.position.y, this.player.position.z);

      this.jumped = false;

      scene.add(this.player);

      // Restricción de giro
      /*var restric = new Physijs.HingeConstraint(this.player, this.objFijo, this.objFijo.position, new THREE.Vector3(0, 1, 0));
      scene.addConstraint(restric);
      restric.setLimits(0, 2*Math.PI, 0, 0);
      restric.enableAngularMotor(velocidadMaxima, aceleracion);*/
   }

   update() {
      this.position.set(this.player.position.x, this.player.position.y, this.player.position.z);

      if (this.forward) {
         this.player.translateZ(0.1);
         this.player.__dirtyPosition = true;
      } else if (this.backward) {
         this.player.translateZ(-0.1);
         this.player.__dirtyPosition = true;
      }

      if (this.left) {
         this.player.rotateY(0.1);
         this.player.__dirtyRotation = true;
      } else if (this.right) {
         this.player.rotateY(-0.1);
         this.player.__dirtyRotation = true;
      }

      if (this.jump) {
         //if (this.position.y === 0) {
            //this.jumped = false;
         //}
         /*var offset = new THREE.Vector3(0, 1, 1);
         this.player.applyCentralImpulse(offset.normalize().multiplyScalar(3));
         //if (this.position.y <= 3.0 && !this.jumped) {
            
         //}
         this.player.__dirtyPosition = true;*/
         this.player.translateY(0.15);
         this.player.__dirtyPosition = true;
      }

      if (this.canceljump) {
         var offset = new THREE.Vector3(0, -1, 0);
         this.player.applyCentralImpulse(offset.normalize().multiplyScalar(5));
      }
   }
}