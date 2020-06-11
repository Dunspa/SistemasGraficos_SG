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
      this.object.__dirtyPosition = true;
   }

   translateY(val) {
      this.object.translateY(val);
      this.object.__dirtyPosition = true;
   }

   translateZ(val) {
      this.object.translateZ(val);
      this.object.__dirtyPosition = true;
   }

   posicion(x, y, z) {
      this.object.position.set(x, y, z);
      this.object.__dirtyPosition = true;
   }

   escala(x, y, z) {
      this.object.scale.set(x, y, z);
   }

   rotaX(val) {
      this.object.rotateX(val);
   }

   rotaZ(val) {
      this.object.rotateZ(val);
   }
}