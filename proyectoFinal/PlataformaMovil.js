// Jose Luis Gallego Peña
// Plataforma que realiza un movimiento en uno de los ejes, 
// desde origen a destino, en cierto tiempo
class PlataformaMovil extends Plataforma {
   constructor(player, textu, dir, origen, destino, tiempo) {
      super(textu);

      this.object.position.set(0, 2, -110);
      
      this.objectOnPlatform = false;
      
      var that = this;
      this.object.addEventListener('collision',
         function (o,v,r,n) {
            if (o.colisionable) {
               that.objectOnPlatform = true;
            }
         });

      // Animacion de la plataforma
      var that = this;
      this.animation = new TWEEN.Tween(origen).to(destino, tiempo)
         .easing(TWEEN.Easing.Cubic.InOut)
         .onUpdate (function () {
            if (that.objectOnPlatform) {
               if (dir === 'X') {
                  that.object.translateX(origen.x);
                  player.translateX(origen.x);
               } else if (dir === 'Y') {
                  that.object.translateY(origen.x);
                  player.translateY(origen.x);
               } else if (dir === 'Z') {
                  that.object.translateZ(origen.x);
                  player.translateZ(origen.x);
               }

               that.object.__dirtyPosition = true;
            }
         })
         .onComplete (function () {
            origen.x = 0.0;
         });
   }

   startAnimation() {
      this.animation.start();
   }
}
 