// Jose Luis Gallego Peña
class Taza extends THREE.Object3D {
   constructor(gui, titleGui) {
      super();

      // Crear geometrías básicas
      var cilindro_grande = new THREE.CylinderGeometry(1.0, 1.0, 2.5, 20.0);
      var cilindro_pequeño = new THREE.CylinderGeometry(1.0, 1.0, 2.5, 20.0);
      var asa = new THREE.TorusGeometry(4.0, 1.0, 30.0, 30.0);

      // Posicionar geometrías básicas
      cilindro_pequeño.scale(0.9, 1.0, 0.9);
      cilindro_pequeño.translate(0.0, 0.4, 0.0);
      asa.scale(0.2, 0.2, 0.2);
      asa.translate(0.8, 0.2, 0.0);

      // Transformar a ThreeBSP
      var bsp_cilindro_grande = new ThreeBSP(cilindro_grande);
      var bsp_cilindro_pequeño = new ThreeBSP(cilindro_pequeño);
      var bsp_asa = new ThreeBSP(asa);

      // Operaciones binarias
      var parte = bsp_cilindro_grande.union(bsp_asa);
      var final = parte.subtract(bsp_cilindro_pequeño);

      // Construir mesh a partir de la geometría final
      var material = new THREE.MeshNormalMaterial();
      this.taza = final.toMesh(material);
      this.taza.geometry.computeFaceNormals();
      this.taza.geometry.computeVertexNormals();
      this.add(this.taza);
   }

   update() {
      // Movimiento continuo del objeto
      this.taza.rotation.z += 0.01;
      this.taza.rotation.y += 0.01;
      this.taza.rotation.x += 0.01;
   }
}
