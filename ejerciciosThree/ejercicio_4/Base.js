// Jose Luis Gallego Peña
class Base extends THREE.Object3D {
   constructor() {
      super();

      // Especificar perfil del obj revolución
      var path = new THREE.Path();
      path.moveTo(0, 0);
      path.lineTo(2, 0);
      path.quadraticCurveTo(1, 0.5, 1, 1);
      path.lineTo(1, 3);
      path.lineTo(0, 3);
      
      var points = path.getPoints();

      // Un Mesh se compone de geometría y material
      var latheGeom = new THREE.LatheGeometry(points, 10, 0, 0);
      // Como material se crea uno a partir de un color
      var latheMat = new THREE.MeshNormalMaterial();

      // Ya podemos construir el Mesh
      this.lathe = new THREE.Mesh(latheGeom, latheMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.lathe);
   }

   update() {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
   }
}
