describe("Weather", function() {

  weather = new Weather;

  describe("Stormy weather", function() {
    it("isStormy should sometimes return true", function() {
      spyOn(Math, 'random').and.returnValue(0.1);
      expect(weather.isStormy()).toEqual(true);
    })
  })
  describe("Clear weather", function() {
    it("isStormy should sometimes return false", function() {
      spyOn(Math, 'random').and.returnValue(0.9);
      expect(weather.isStormy()).toEqual(false);
    })
  })
})
