// Jose Luis Gallego Peña
class Bloque extends ObjetoFisico {
   constructor(player, textu) {
      super();

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load(textu);
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (1,1,1),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            0.5, 0),
         5
      );
      
      this.object.addEventListener('collision', function(o,v,r,n) {
         if (o.colisionable) {
            player.jump = false;
            player.jumping = true;
            player.climbing = true;
            player.bajarrapido = false; 
         } 
      });
   }

   createConstraint(scene) {
      var restric = new Physijs.DOFConstraint(this.object, this.object.position);
      scene.addConstraint(restric);

      // Límites al movimiento, distancia mínima y máxima
      restric.setLinearLowerLimit(new THREE.Vector3(-60, -10, -60)); 
      restric.setLinearUpperLimit(new THREE.Vector3(60, 0, 60)); 
   }
}