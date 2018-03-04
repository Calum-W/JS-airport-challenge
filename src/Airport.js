var Airport = function (capacity) {

  this._hangar = [];

  if (capacity === undefined) {
        this.CAPACITY = 20;
    } else {
      this.CAPACITY = capacity
    }

  this.land = function(plane, weather = new Weather) {
    if (weather.isStormy()) {
      throw new Error("Stormy");
    }
    else if (this._hangar.length >= this.CAPACITY) {
        throw new Error("Airport full");
    }
    plane.land();
    this._hangar.push(plane);
  };

  this.takeOff = function(plane, weather = new Weather) {
    if (weather.isStormy()) {
      throw new Error("Stormy");
    }
    removePlane(this._hangar, plane);
    plane.takeOff();
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
