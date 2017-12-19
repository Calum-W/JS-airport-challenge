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
  this._hangar = [];
  if (capacity === undefined) {
        this.CAPACITY = 20;
    } else {
      this.CAPACITY = capacity
    }
  this.land = function(plane) {
    if (this.isStormy()) {
      throw new Error("Stormy");
    }
    else if (this._hangar.length >= this.CAPACITY) {
        throw new Error("Airport full");
    }
    plane.land();
    this._hangar.push(plane);
  };
  this.takeOff = function(plane) {
    if (this.isStormy()) {
      throw new Error("Stormy");
    }
    plane.takeOff();
    removePlane(this._hangar, plane);
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

Airport.prototype.isStormy = function() {
  return false
}
