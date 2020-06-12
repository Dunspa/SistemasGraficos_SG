// Jose Luis Gallego Peña
// Un cartel en 3d con una texto
class CartelInformativo extends THREE.Object3D {
   constructor(text) {
      super();

      // Cartel
      /*var map = new THREE.TextureLoader().load(text);
      var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
      this.object = new THREE.Sprite(material);
      this.object.scale.set(2, 2, 1);*/

      var loader = new THREE.FontLoader();
      var that = this;
      loader.load( 'Roboto_Regular.json', function (font) {
         var geometry = new THREE.TextGeometry(text, {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
         });

         geometry.rotateY(Math.PI);
         geometry.scale(0.006, 0.006, 0.006)

         var texture = new THREE.TextureLoader().load('./imgs/stone1.jpg');
         var material = new THREE.MeshBasicMaterial({color: "#000000"});

         that.add(new THREE.Mesh(geometry, material));
      });
   }
}