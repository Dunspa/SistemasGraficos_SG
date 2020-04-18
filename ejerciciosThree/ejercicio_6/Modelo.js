// Jose Luis Gallego Peña
class Modelo extends THREE.Object3D {
   constructor() {
      super();

      var that = this;
      var materialLoader = new THREE.MTLLoader();
      var objectLoader = new THREE.OBJLoader();
      materialLoader.load ('../models/Cat/12221_Cat_v1_l3.mtl',
         function (materials) {
            objectLoader.setMaterials(materials);
            objectLoader.load('../models/Cat/12221_Cat_v1_l3.obj',
               function (object) {
                  var modelo = object;
                  modelo.rotateX(-Math.PI/2);
                  modelo.scale.set(0.3, 0.3, 0.3);
                  modelo.translateZ(-5);
                  that.add(modelo);
               }, null, null);
         });
   }

   update() {
      // Movimiento continuo del objeto
      this.rotation.z += 0.01;
      this.rotation.y += 0.01;
      this.rotation.x += 0.01;
   }
}
