// Jose Luis Gallego Peña
// Un cartel en 3d con una texto
class CartelInformativo extends ObjetoFisico {
   constructor() {
      super();

      // Cartel

      // Crear texto
      /*var dynamicTexture = new THREEx.DynamicTexture(512,512)
	   dynamicTexture.context.font = "bolder 90px Verdana";
	   dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy()
	   updateFcts.push(function(delta, now){
         // build the text which contains the time
         var present	= new Date()
         var text	= pad(present.getHours(), 2, '0')
            + ':' + pad(present.getMinutes(), 2, '0')
            + ':' + pad(present.getSeconds(), 2, '0')
         function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
         }

         // update the text
         dynamicTexture.clear('cyan')
            .drawText(text, undefined, 256, 'red')
	   });*/

      var texture = new THREE.TextureLoader().load('./imgs/ladrillo-bump.png');
      this.object = new Physijs.BoxMesh (
         new THREE.BoxGeometry (3,3,0.5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            1, 0),
         0
      );
   }
}