// Jose Luis Gallego Peña
class Plataforma extends ObjetoFisico {
   constructor(textu) {
      super();

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load(textu);
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (5,0.2,5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            1, 0),
         0
      );
      this.object.position.set(0, 2, -110);
   }
}