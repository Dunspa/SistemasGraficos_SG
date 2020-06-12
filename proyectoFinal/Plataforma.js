// Jose Luis Gallego Peña
class Plataforma extends ObjetoFisico {
   constructor(player, textu) {
      super();

      this.objectOnPlatform = false;
      this.final = false;
      this.endgame = false;

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load(textu);
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (5,0.2,5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            1, 0),
         0
      );

      var that = this;
      this.object.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               that.objectOnPlatform = true;
               player.jump = false;
               player.jumping = true;
               player.climbing = true;
               player.bajarrapido = true; 
            }

            if (that.final) {
               that.endgame = true;
            }
         });
   }
}