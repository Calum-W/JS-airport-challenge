describe("Airport", function() {

  var plane;
  var plane2;
  var spyPlane
  var airport;
  var clearWeather;

  beforeEach(function() {
    plane = new Plane();
    plane2 = new Plane();
    airport = new Airport();
    clearWeather = new Weather();
    spyPlane = jasmine.createSpyObj('spyPlane', ['takeOff', 'land']);
    spyOn(clearWeather, 'isStormy').and.returnValue(false);
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
      airport.land(plane, clearWeather);
      expect(airport._hangar).toContain(plane);
    });

    it("should throw an error if the airport is already at capacity", function() {
      for (var i = 0; i < airport.CAPACITY; i++) {
        airport.land(new Plane(), clearWeather);
      }
      expect(function() {airport.land(plane, clearWeather)}).toThrow(new Error('Airport full'));
    });

    it("should tell the plane to land", function() {
      airport.land(spyPlane);
      expect(spyPlane.land).toHaveBeenCalled();
    });
  });

  describe("take off", function() {
    it("should remove a plane from the hangar", function() {
      airport.land(plane, clearWeather);
      airport.takeOff(plane, clearWeather);
      expect(airport._hangar.length).toEqual(0);
    });

    it("should only remove the correct plane from the hangar", function() {
      airport.land(plane, clearWeather);
      airport.land(plane2, clearWeather);
      airport.takeOff(plane, clearWeather);
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
  var stormyWeather;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
    stormyWeather = new Weather
    spyOn(stormyWeather, 'isStormy').and.returnValue(true);
  });

  it("blocks take off when the weather is stormy", function() {
    airport._hangar.push(plane);
    plane.isFlying = false;
    expect(function(){ airport.takeOff(plane, stormyWeather) }).toThrowError('Stormy')
    expect(airport._hangar).toContain(plane);
  });

  it("blocks land when the weather is stormy", function() {
    expect(function(){ airport.land(plane, stormyWeather) }).toThrowError('Stormy')
    expect(airport._hangar.length).toEqual(0);
  });
});
