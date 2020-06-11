// Jose Luis Gallego Peña
class Obstaculo extends ObjetoFisico {
   constructor(textu, op) {
      super();

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load(textu);
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (5,0.2,5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture, transparent: true, opacity: op}), 
            1, 0),
         0
      );
   }
}