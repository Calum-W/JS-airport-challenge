var Plane = function() {

  this.isFlying = true;

  this.takeOff = function() {
    if (this.isFlying == true) {
      throw new Error("Plane is flying");
    } else {
        this.isFlying = true;
        return "lookin' breezy";
      }
   };

   this.land = function() {
     if (this.isFlying == false) {
       throw new Error("Plane is grounded");
     } else {
         this.isFlying = false;
         return "lookin' earthy";
       };
   };
};
