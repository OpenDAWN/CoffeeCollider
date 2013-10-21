define(function(require, exports, module) {

  var assert = require("chai").assert;

  var scale = require("./scale");
  var _Scale  = scale.Scale;
  var _Tuning = scale.Tuning;

  assert.deepCloseTo = function(expected, actual, delta) {
    expected.forEach(function(x, i) {
      assert.closeTo(x, actual[i], delta);
    });
  };
  
  describe("scale.js", function() {
    before(function() {
      scale.install();
    });
    describe("Tuning", function() {
      var et12, just, expected, actual;
      before(function() {
        et12 = Tuning.et12;
        just = Tuning.just;
      });
      it("create", function() {
        var list = [0,1,2,3,4,5,6,7,8,9,10,11];
        var t = Tuning(list, 2, "test");
        assert.instanceOf(t, _Tuning);
        assert.equal("test", t.name);
      });
      it("semitones", function() {
        expected = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
        actual = et12.semitones();
        assert.deepEqual(expected, actual);
        
        expected = [ 0, 1.1173128526978, 2.0391000173077, 3.1564128700055, 3.8631371386483, 4.9804499913461, 5.9022371559561, 7.0195500086539, 8.1368628613517, 8.8435871299945, 10.175962878659, 10.882687147302 ];
        actual = just.semitones();
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("cents", function() {
        expected = [ 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100 ];
        actual = et12.cents();
        assert.deepEqual(expected, actual);

        expected = [ 0, 111.73128526978, 203.91000173077, 315.64128700055, 386.31371386483, 498.04499913461, 590.22371559561, 701.95500086539, 813.68628613517, 884.35871299945, 1017.5962878659, 1088.2687147302 ];
        actual = just.cents();
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("ratios", function() {
        expected = [ 1, 1.0594630943591, 1.1224620483089, 1.1892071150019, 1.2599210498937, 1.3348398541685, 1.4142135623711, 1.4983070768743, 1.5874010519653, 1.6817928305039, 1.7817974362766, 1.8877486253586 ];
        actual = et12.ratios();
        assert.deepCloseTo(expected, actual, 1e-6);

        expected = [ 1, 1.0666666666664, 1.1249999999995, 1.1999999999991, 1.2499999999989, 1.3333333333318, 1.4062499999981, 1.4999999999976, 1.599999999997, 1.6666666666633, 1.7999999999958, 1.8749999999953 ];
        actual = just.ratios();
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("at", function() {
        assert.equal(0, et12.at(0));
        assert.equal(1, et12.at(1));
        assert.equal(2, et12.at(2));
        assert.deepEqual([3, 4, 5], et12.at([3, 4, 5]));
        assert.isUndefined(et12.at(12));
        assert.isUndefined(et12.at(-1));
      });
      it("wrapAt", function() {
        assert.equal(0, et12.wrapAt(0));
        assert.equal(1, et12.wrapAt(1));
        assert.equal(2, et12.wrapAt(2));
        assert.equal(0, et12.wrapAt(12));
        assert.equal(11, et12.wrapAt(-1));
      });
      it("octaveRatio", function() {
        assert.equal(2, et12.octaveRatio());
      });
      it("size", function() {
        assert.equal(12, et12.size());
      });
      it("stepsPerOctave", function() {
        assert.equal(12, et12.stepsPerOctave());
      });
      it("tuning", function() {
        expected = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
        actual = et12.tuning();
        assert.deepEqual(expected, actual);

        expected = [ 0, 1.1173128526978, 2.0391000173077, 3.1564128700055, 3.8631371386483, 4.9804499913461, 5.9022371559561, 7.0195500086539, 8.1368628613517, 8.8435871299945, 10.175962878659, 10.882687147302 ];
        actual = just.tuning();
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("equals / copy", function() {
        var copied = just.copy();
        assert.notEqual(just, copied);
        assert.ok(just.equals(copied));
      });
    });
    describe("Scale", function() {
      var major, kumoi, expected, actual;
      before(function() {
        major = Scale.major;
        kumoi = Scale.kumoi;
      });
      it("create", function() {
        var list = [0,2,4,5,7,9,11];
        var s = Scale(list, 12, null, "test");
        assert.instanceOf(s, _Scale);
        assert.equal("test", s.name);
      });
      it("tuning", function() {
        major.tuning(Tuning.just);
        assert.notOk(major.tuning().equals(Tuning.et12));
        major.tuning(Tuning.at("et12"));
        assert.notEqual(major.tuning(), Tuning.et12);
        assert.ok(major.tuning().equals(Tuning.et12));
      });
      it("semitones", function() {
        expected = [ 0, 2, 4, 5, 7, 9, 11 ];
        actual = major.semitones();
        assert.deepEqual(expected, actual);

        expected = [ 0, 2, 3, 7, 9 ];
        actual = kumoi.semitones();
        assert.deepEqual(expected, actual);
      });
      it("cents", function() {
        expected = [ 0, 200, 400, 500, 700, 900, 1100 ];
        actual = major.cents();
        assert.deepEqual(expected, actual);

        expected = [ 0, 200, 300, 700, 900 ];
        actual = kumoi.cents();
        assert.deepEqual(expected, actual);
      });
      it("ratios", function() {
        expected = [ 1, 1.1224620483089, 1.2599210498937, 1.3348398541685, 1.4983070768743, 1.6817928305039, 1.8877486253586 ];
        actual = major.ratios();
        assert.deepCloseTo(expected, actual, 1e-6);

        expected = [ 1, 1.1224620483089, 1.1892071150019, 1.4983070768743, 1.6817928305039 ];[ 0, 200, 300, 700, 900 ];
        actual = kumoi.ratios();
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("size", function() {
        expected = 7;
        actual = major.size();
        assert.equal(expected, actual);

        expected = 5;
        actual = kumoi.size();
        assert.equal(expected, actual);
      });
      it("pitchesPerOctave", function() {
        expected = 12;
        actual = major.pitchesPerOctave();
        assert.equal(expected, actual);

        expected = 12;
        actual = kumoi.pitchesPerOctave();
        assert.equal(expected, actual);
      });
      it("stepsPerOctave", function() {
        expected = 12;
        actual = major.stepsPerOctave();
        assert.equal(expected, actual);

        expected = 12;
        actual = kumoi.stepsPerOctave();
        assert.equal(expected, actual);
      });
      it("at", function() {
        assert.equal(0, major.at(0));
        assert.equal(2, major.at(1));
        assert.equal(4, major.at(2));
        assert.deepEqual([5,7,9], major.at([3,4,5]));
        assert.equal(9, major.at(12));
        assert.equal(11, major.at(-1));
      });
      it("wrapAt", function() {
        assert.equal(0, major.wrapAt(0));
        assert.equal(2, major.wrapAt(1));
        assert.equal(4, major.wrapAt(2));
        assert.deepEqual([5,7,9], major.wrapAt([3,4,5]));
        assert.equal(9, major.wrapAt(12));
        assert.equal(11, major.wrapAt(-1));
      });
      it("degreeToFreq", function() {
        expected = 739.98884542173;
        actual   = major.degreeToFreq(5, 440, 0);
        assert.closeTo(expected, actual, 1e-6);
        
        expected = [ 493.8833012559, 1046.5022612017, 329.62755691234 ];
        actual   = kumoi.degreeToFreq([1,2,3], 440, [0, 1, -1]);
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("degreeToRatio", function() {
        expected = 3.3635856610079;
        actual   = major.degreeToRatio(5, 1);
        assert.closeTo(expected, actual, 1e-6);

        expected = [ 1.1224620483089, 2.3784142300038, 0.74915353843713 ];
        actual   = kumoi.degreeToRatio([1,2,3], [0,1,-1]);
        assert.deepCloseTo(expected, actual, 1e-6);
      });
      it("degrees", function() {
        expected = [ 0, 2, 4, 5, 7, 9, 11 ];
        actual   = major.degrees();
        assert.deepEqual(expected, actual);

        expected = [ 0, 2, 3, 7, 9 ];
        actual   = kumoi.degrees();
        assert.deepEqual(expected, actual);
      });
      it("octaveRatio", function() {
        expected = 2;
        actual   = major.octaveRatio();
        assert.equal(expected, actual);

        expected = 2;
        actual   = kumoi.octaveRatio();
        assert.equal(expected, actual);
      });
      it("equals", function() {
        var copied = major.copy();
        assert.notEqual(major, copied);
        assert.ok(major.equals(copied));
      });
    });
  });

});
