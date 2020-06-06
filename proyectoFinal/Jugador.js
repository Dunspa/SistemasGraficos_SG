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

      this.player.position.set (0, 2, -130);
      this.player.rotateY(Math.PI / 2);
         
      this.position.set(this.player.position.x, this.player.position.y, this.player.position.z);

      this.player.colisionable = true;
      
      scene.add(this.player);
   }

   update(copiaRotation) {
      this.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
      this.player.rotation.copy(copiaRotation);
      this.player.__dirtyRotation = true;

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

      this.rotation.set(this.player.rotation.x, this.player.rotation.y, this.player.rotation.z);
   }

   translateZ(val) {
      this.player.translateZ(val);
      this.player.__dirtyPosition = true;
   }
}