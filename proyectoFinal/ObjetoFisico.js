// Jose Luis Gallego Peña
// Clase que engloba todos los objetos fisicos
class ObjetoFisico extends THREE.Object3D {
   constructor() {
      super();
   }

   addToScene(scene) {
      scene.add(this.object);
   }

   translateX(val) {
      this.object.translateX(val);
   }

   translateY(val) {
      this.object.translateY(val);
   }

   translateZ(val) {
      this.object.translateZ(val);
   }

   posicion(x, y, z) {
      this.object.position.set(x, y, z);
   }
}