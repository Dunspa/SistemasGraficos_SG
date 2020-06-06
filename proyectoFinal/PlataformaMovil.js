// Jose Luis Gallego Peña
class PlataformaMovil extends THREE.Object3D {
   constructor(scene) {
      super();

      // Plataforma que recorrerá el camino
      var texture = new THREE.TextureLoader().load('./imgs/stone2.jpg');
      this.platform = new Physijs.BoxMesh (
         new THREE.BoxGeometry (5,0.2,5),
         Physijs.createMaterial(
            new THREE.MeshLambertMaterial({map: texture}), 
            0.1, 0.9),
         0
      );
      this.platform.position.set(0, 2, -110);
      
      this.objectOnPlatform = false;
      
      var that = this;
      this.platform.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               that.objectOnPlatform = true;
            }
         });
      
      this.add(this.platform);
      scene.add(this.platform);
   }

   translateZ(val) {
      this.platform.translateZ(val);
      this.platform.__dirtyPosition = true;
   }
}
 