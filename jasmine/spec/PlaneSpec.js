describe("Plane", function() {

  var plane;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
  });

  describe('take off', function() {
    it("should throw an error if the plane is flying", function() {
      expect(function() {plane.takeOff()}).toThrow(new Error('Plane is flying'));
    });

    it("should set the plane's status to flying", function() {
      plane.land(airport)
      plane.takeOff();
      expect(plane.isFlying).toBe(true)
    });
  });

  describe('land', function() {
    it("should set the plane's status to not be flying", function() {
      plane.land(airport)
      expect(plane.isFlying).toBe(false)
    });
  });
});


describe("Airport", function() {

  var plane;
  var plane2;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    plane2 = new Plane();
    airport = new Airport();
  });

  it("should initialise as empty", function() {
    expect(airport.hangar.length).toEqual(0)
  });

  it("should have a variable capacity", function() {
    tenAirport = new Airport(10);
    expect(tenAirport.CAPACITY).toEqual(10);
  })

  describe("land", function() {
    it("should add a plane to the hangar", function() {
      airport.land(plane);
      expect(airport.hangar[0]).toEqual(plane);
    });

    it("should throw an error if the airport is already at capacity", function() {
      for (var i = 0; i < airport.CAPACITY; i++) {
        airport.land(new Plane());
      }
      expect(function() {airport.land(plane)}).toThrow(new Error('Airport full'));
    });
  });

  describe("take off", function() {
    it("should remove a plane from the hangar", function() {
      airport.land(plane);
      airport.takeOff(plane);
      expect(airport.hangar.length).toEqual(0);
    });

    it("should only remove the correct plane from the hangar", function() {
      airport.land(plane);
      airport.land(plane2);
      airport.takeOff(plane);
      expect(airport.hangar[0]).toEqual(plane2);
    });

    it("should throw an error if the plane is not docked at that airport", function() {
      plane.isFlying = false
      expect(function() {airport.takeOff(plane)}).toThrow(new Error('Plane not docked at this airport'));
    });
  });
});

// describe("weather", function() {
//   it("should sometimes return stormy", function() {
//     expect(isStormy()).toEqual(true);
//   })
// })
