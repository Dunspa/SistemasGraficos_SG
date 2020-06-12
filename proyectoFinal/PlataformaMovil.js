// Jose Luis Gallego Peña
// Plataforma que realiza un movimiento en uno de los ejes, 
// desde origen a destino, en cierto tiempo
class PlataformaMovil extends Plataforma {
   constructor(player, textu, dir, origen, destino, tiempo) {
      super(player, textu);
      this.player = player;
      this.dir = dir;
      this.origen = origen;
      this.destino = destino;
      this.tiempo = tiempo;
   }

   startAnimation(segundosTranscurridos) {
      // Animacion de la plataforma
      var velocidadT = 50;
      var that = this;
      this.animation = new TWEEN.Tween(this.origen).to(this.destino, this.tiempo)
         .easing(TWEEN.Easing.Cubic.InOut)
         .onUpdate(function () {
            if (that.objectOnPlatform) {
               if (that.dir === 'X') {
                  that.object.translateX(that.origen.x * segundosTranscurridos * velocidadT);
                  that.player.translateX(that.origen.x * segundosTranscurridos * velocidadT);
               } else if (that.dir === 'Y') {
                  that.object.translateY(that.origen.x * segundosTranscurridos * velocidadT);
                  that.player.translateY(that.origen.x * segundosTranscurridos * velocidadT);
               } else if (that.dir === 'Z') {
                  that.object.translateZ(that.origen.x * segundosTranscurridos * velocidadT);
                  that.player.translateZ(that.origen.x * segundosTranscurridos * velocidadT);
               }

               that.object.__dirtyPosition = true;
            }
         })
         .onComplete(function () {
            that.origen.x = 0.0;
            that.objectOnPlatform = false;
         });

      this.animation.start();
   }

   restartPosition() {
      this.object.position.copy(this.pos);
      this.object.__dirtyPosition = true;
   }

   savePosition() {
      this.pos = this.object.position.clone();
      this.pos.copy(this.object.position);
   }
}
 