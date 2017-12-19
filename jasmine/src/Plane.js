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

var Airport = function(capacity) {
  this.hangar = [];
  if (capacity === undefined) {
        this.CAPACITY = 20;
    } else {
      this.CAPACITY = capacity;
    }
  this.land = function(plane) {
    if (this.hangar.length >= this.CAPACITY) {
        throw new Error("Airport full");
    } else {
    plane.land();
    this.hangar.push(plane);
  };
  };
  this.takeOff = function(plane) {
    plane.takeOff();
    removePlane(this.hangar, plane);
  };
};

function removePlane(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    } else {
      throw new Error("Plane not docked at this airport");
    }
}
