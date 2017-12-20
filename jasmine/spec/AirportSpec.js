describe("Airport", function() {

  var plane;
  var plane2;
  var spyPlane
  var airport;

  beforeEach(function() {
    plane = new Plane();
    plane2 = new Plane();
    airport = new Airport();
    spyPlane = jasmine.createSpyObj('spyPlane', ['takeOff', 'land']);
    spyOn(airport, 'isStormy').and.returnValue(false);
  });

  it("should initialise as empty", function() {
    expect(airport._hangar.length).toEqual(0);
  });

  it("should have a variable capacity", function() {
    tenAirport = new Airport(10);
    expect(tenAirport.CAPACITY).toEqual(10);
  })

  describe("land", function() {
    it("should add a plane to the hangar", function() {
      airport.land(plane);
      expect(airport._hangar).toContain(plane);
    });

    it("should throw an error if the airport is already at capacity", function() {
      for (var i = 0; i < airport.CAPACITY; i++) {
        airport.land(new Plane());
      }
      expect(function() {airport.land(plane)}).toThrow(new Error('Airport full'));
    });

    it("should tell the plane to land", function() {
      airport.land(spyPlane);
      expect(spyPlane.land).toHaveBeenCalled();
    });
  });

  describe("take off", function() {
    it("should remove a plane from the hangar", function() {
      airport.land(plane);
      airport.takeOff(plane);
      expect(airport._hangar.length).toEqual(0);
    });

    it("should only remove the correct plane from the hangar", function() {
      airport.land(plane);
      airport.land(plane2);
      airport.takeOff(plane);
      expect(airport._hangar[0]).toEqual(plane2);
    });

    it("should throw an error if the plane is not docked at that airport", function() {
      plane.isFlying = false
      expect(function() {airport.takeOff(plane)}).toThrow(new Error('Plane not docked at this airport'));
    });

    it("should tell the plane to take off", function() {
      airport.land(spyPlane);
      airport.takeOff(spyPlane);
      expect(spyPlane.takeOff).toHaveBeenCalled();
    });
  });
});

describe("stormy weather", function() {

  var plane;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
  });

  it("blocks take off when the weather is stormy", function() {
    airport._hangar.push(plane);
    plane.isFlying = false;
    spyOn(airport, 'isStormy').and.returnValue(true);
    expect(function(){ airport.takeOff(plane) }).toThrowError('Stormy')
    expect(airport._hangar).toContain(plane);
  });

  it("blocks land when the weather is stormy", function() {
    spyOn(airport, 'isStormy').and.returnValue(true);
    expect(function(){ airport.land(plane) }).toThrowError('Stormy')
    expect(airport._hangar.length).toEqual(0);
  });
});
