class Llave extends THREE.Object3D {
   constructor() {
      super();

      var map = new THREE.TextureLoader().load('./imgs/key.png');
      var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
      this.key = new THREE.Sprite(material);
      this.key.scale.set(2, 2, 1);
      this.add(this.key);
   }
}