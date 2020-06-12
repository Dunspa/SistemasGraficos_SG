// Jose Luis Gallego Peña
class Puerta extends ObjetoFisico {
   constructor(scene, textu) {
      super();

      var texture = new THREE.TextureLoader().load(textu);
      var physiMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({map: texture}), 1, 1);

      // El cilindro hace de bisagra
      var geometry = new THREE.CylinderGeometry(0.35, 0.35, 1.4);
      geometry.scale(1, 2, 2);
      this.ref = new Physijs.CylinderMesh (
         geometry, physiMaterial, 0
      );
      
      // La pieza que gira sobre la bisagra, una caja
      geometry = new THREE.BoxGeometry (5,1,1);
      geometry.scale(2, 4, 1.5);
      this.hinge = new Physijs.BoxMesh (
         geometry, physiMaterial, 1
      );
   }

   addToScene(scene) {
      scene.add(this.ref);
      scene.add(this.hinge);
   }

   createConstraint(scene) {
      // Restricción
      this.restric = new Physijs.HingeConstraint (
         this.hinge, this.ref, 
         this.ref.position, 
         new THREE.Vector3(0, 1, 0)
      );
      scene.addConstraint(this.restric);
      
      this.restric.setLimits(0, Math.PI/2, 0.5, 0.5);
      //this.restric.enableAngularMotor(0, 0);
   }

   openDoor() {
      this.restric.enableAngularMotor(10, 10);
      //this.restric.disableMotor(0, 0);
   }

   posicion(x, y, z) {
      this.ref.position.set(x, y+0.5, z);
      this.hinge.position.set(this.ref.position.x-6, this.ref.position.y, this.ref.position.z+0.2);
      this.ref.__dirtyPosition = true;
      this.hinge.__dirtyPosition = true;
      this.position.set(this.hinge.position.x, this.hinge.position.y, this.hinge.position.z);
   }

   escala(x, y, z) {
      this.ref.scale.set(x, y, z);
      this.hinge.scale.set(x, y, z);
   }
}