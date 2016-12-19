'use strict';
var helpFuncs = require('./../help-funcs').default;

describe('Help functions:', function () {

  describe('with positive argument', function () {
    it('should calculate string length in two character', function () {
      expect(helpFuncs.generateId(2)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{2}$/));
    });
  });

  describe('with negative argument', function () {
    it('should calculate string length in five character', function () {
      expect(helpFuncs.generateId(-5)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{5}$/));
    });
  });

  describe('with too much positive argument', function () {
    it('should calculate string length in twenty character', function () {
      expect(helpFuncs.generateId(500000)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{20}$/));
    });
  });

  describe('with too much negative argument', function () {
    it('should calculate string length in twenty character', function () {
      expect(helpFuncs.generateId(-500000)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{20}$/));
    });
  });

  describe('when argument is a string', function () {
    it('should calculate string length in five character', function () {
      expect(helpFuncs.generateId("5")).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{5}$/));
    });
  });

  describe('when argument is equal zero', function () {
    it('should calculate string length in one character', function () {
      expect(helpFuncs.generateId(0)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{1}$/));
    });
  });

});
