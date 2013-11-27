define(function(require, exports, module) {
  "use strict";
  
  var assert = require("chai").assert;

  var unitTestSuite = require("../../testTools").unitTestSuite;
  var unit = require("../server/unit");
  var bufio = require("./bufio");
  
  unitTestSuite.desc = "plugins/bufio.js";
  
  unitTestSuite("PlayBuf", [
    { rate  : C.AUDIO,
      inputs: [
        { name:"bufnum"    , value:0 },
        { name:"rate"      , value:1 },
        { name:"trigger"   , value:0 },
        { name:"startPos"  , value:0 },
        { name:"loop"      , value:0 },
        { name:"doneAction", value:0 },
      ]
    },
  ], {
    beforeEach: function() {
      unitTestSuite.instance = {
        buffers: [ null ]
      };
    },
    preProcess: function(i) {
      if (i === 0) {
        for (var j = this.outputs[0].length; j--; ) {
          this.outputs[0][j] = 0;
        }
      }
      if (i === 1) {
        unitTestSuite.instance.buffers[0] = {
          samples : new Float32Array(1024),
          channels: 1,
          frames  : 1024,
        };
      }
    }
  });

});