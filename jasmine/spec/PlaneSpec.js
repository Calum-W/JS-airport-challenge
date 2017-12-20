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
      plane.land(airport);
      plane.takeOff();
      expect(plane.isFlying).toBe(true);
    });
  });

  describe('land', function() {
    it("should set the plane's status to not be flying", function() {
      plane.land(airport);
      expect(plane.isFlying).toBe(false);
    });
  });
});
