define(function(require, exports, module) {
  "use strict";

  var cc = require("../../cc");
  
  var use = function() {
    require("./coffee").use();
    
    cc.createCompiler = function(lang) {
      if (lang === "coffee") {
        return cc.createCoffeeCompiler();
      }
    };
  };
  
  module.exports = {
    use:use
  };

});