// Jose Luis Gallego Peña
// Un cartel en 3d con una texto
class CartelInformativo extends ObjetoFisico {
   constructor() {
      super();

      // Cartel

      // Crear texto
      /*var bitmap = document.createElement('canvas');
      var g = bitmap.getContext('2d');
      bitmap.width = 100;
      bitmap.height = 100;
      g.font = 'Bold 20px Arial';
      var text = "hola";
      g.fillStyle = 'white';
      g.fillText(text, 0, 20);
      g.strokeStyle = 'black';
      g.strokeText(text, 0, 20);

      // canvas contents will be used for a texture
      var texture = new THREE.Texture(bitmap) */
      var texture = new THREE.TextureLoader().load('./imgs/ladrillo-bump.png');
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (5,0.2,5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            1, 0),
         0
      );
   }
}