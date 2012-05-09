// Sample Custom Matcher
beforeEach(function() {
  this.addMatchers({
    toBeSomething: function(expected) {
      var something = this.actual;
      return something.someMethod === expected;
    }
  });
});
