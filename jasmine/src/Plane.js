var Plane = function() {
  this.isFlying = false
  this.takeOff = function() {
    if (this.isFlying == true) {
      throw new Error("Plane is flying");
    } else {
        this.isFlying = true;
        return "lookin' breezy";
      }
   };
};
