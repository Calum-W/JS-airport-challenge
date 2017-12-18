describe("Plane", function() {

  var plane;

  beforeEach(function() {
    plane = new Plane();
  });

  describe('take off', function() {
    it("should throw an error if the plane is flying", function() {
      plane.takeOff();
      expect(function() {plane.takeOff()}).toThrow(new Error('Plane is flying'));
    });

    it("should set the plane's status to flying", function() {
      plane.takeOff();
      expect(plane.isFlying).toBe(true)
    })
  });
});
