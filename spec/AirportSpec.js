describe("Airport", function() {

  var spyPlane
  var airport;
  var clearWeather
  var spyPlane2

  beforeEach(function() {
    airport = new Airport();
    clearWeather = jasmine.createSpyObj('clearWeather', {'isStormy': false});
    spyPlane = jasmine.createSpyObj('spyPlane', ['takeOff', 'land']);
    spyPlane2 = jasmine.createSpyObj('spyPlane2', ['takeOff', 'land']);
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
      airport.land(spyPlane, clearWeather);
      expect(airport._hangar).toContain(spyPlane);
    });

    it("should throw an error if the airport is already at capacity", function() {
      for (var i = 0; i < airport.CAPACITY; i++) {
        airport.land(new Plane(), clearWeather);
      }
      expect(function() {airport.land(spyPlane, clearWeather)}).toThrow(new Error('Airport full'));
    });

    it("should tell the plane to land", function() {
      airport.land(spyPlane, clearWeather);
      expect(spyPlane.land).toHaveBeenCalled();
    });
  });

  describe("take off", function() {
    it("should remove a plane from the hangar", function() {
      airport.land(spyPlane, clearWeather);
      airport.takeOff(spyPlane, clearWeather);
      expect(airport._hangar.length).toEqual(0);
    });

    it("should only remove the correct plane from the hangar", function() {
      airport.land(spyPlane, clearWeather);
      airport.land(spyPlane2, clearWeather);
      airport.takeOff(spyPlane, clearWeather);
      expect(spyPlane.takeOff).toHaveBeenCalled();
      expect(spyPlane2.takeOff).not.toHaveBeenCalled();
    });

    it("should throw an error if the plane is not docked at that airport", function() {
      spyPlane.isFlying = false
      expect(function() {airport.takeOff(spyPlane, clearWeather)}).toThrow(new Error('Plane not docked at this airport'));
    });

    it("shouldn'tcall take off on plane if not docked at that airport", function() {
      spyPlane.isFlying = false
      expect(function() {airport.takeOff(spyPlane, clearWeather)}).toThrow(new Error('Plane not docked at this airport'));
      expect(spyPlane.takeOff).not.toHaveBeenCalled();
    });

    it("should tell the plane to take off", function() {
      airport.land(spyPlane, clearWeather);
      airport.takeOff(spyPlane, clearWeather);
      expect(spyPlane.takeOff).toHaveBeenCalled();
    });
  });
});

describe("stormy weather", function() {

  var spyPlane;
  var airport;
  var stormyWeather;

  beforeEach(function() {
    spyPlane = jasmine.createSpyObj('spyPlane', ['takeOff', 'land']);
    airport = new Airport();
    stormyWeather = jasmine.createSpyObj('stormyWeather', {
      'isStormy': true
    });
  });

  it("blocks take off when the weather is stormy", function() {
    airport._hangar.push(spyPlane);
    spyPlane.isFlying = false;
    expect(function(){ airport.takeOff(spyPlane, stormyWeather) }).toThrowError('Stormy')
    expect(airport._hangar).toContain(spyPlane);
    expect(spyPlane.takeOff).not.toHaveBeenCalled();
  });

  it("blocks land when the weather is stormy", function() {
    expect(function(){ airport.land(spyPlane, stormyWeather) }).toThrowError('Stormy')
    expect(spyPlane.land).not.toHaveBeenCalled();
  });
});
