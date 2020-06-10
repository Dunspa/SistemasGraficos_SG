// Jose Luis Gallego Peña
class Bloque extends ObjetoFisico {
   constructor(textu) {
      super();

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load(textu);
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (1,1,1),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            1, 0),
         1
      );
   }

   createConstraint(scene) {
      var restric = new Physijs.DOFConstraint(this.object, this.object.position);
      scene.addConstraint(restric);

      // Límites al movimiento, distancia mínima y máxima
      restric.setLinearLowerLimit(new THREE.Vector3(-10, 0, -10)); 
      restric.setLinearUpperLimit(new THREE.Vector3(10, 0, 10)); 
   }
}