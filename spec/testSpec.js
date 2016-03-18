var testObj = {
  something: $.Deferred(),

  doSomethingElse: function() { console.log('oh no, the real function was called!')},

  myMethod: function() {
    this.something.done(function() {
      this.doSomethingElse();
    });
  }
}

describe('async testing', function() {

  it('works', function() {
    runs(function() {
      var mockDefer = $.Deferred();

      testObj.something = mockDefer;
      spyOn(testObj, 'doSomethingElse');
      testObj.myMethod();
      mockDefer.resolve.call(testObj, 'someVal');
    });

    waitsFor(function() {
      return testObj.doSomethingElse.calls.length >= 1;
    }, 'the spy to be be called', 1000);

    runs(function() {
      expect(testObj.doSomethingElse.calls.length).toEqual(1);
    });
  });

});
