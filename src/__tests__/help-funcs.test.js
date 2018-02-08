/* eslint-disable no-magic-numbers */
/* global jasmine */
const helpFuncs = require('./../help-funcs').default;

describe('Help functions:', () => {

  describe('without arguments', () => {
    it('should calculate string length in four character', () => {
      expect(helpFuncs.generateId()).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{4}$/));
    });
  });

  describe('with positive argument', () => {
    it('should calculate string length in two character', () => {
      expect(helpFuncs.generateId(2)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{2}$/));
    });
  });

  describe('with negative argument', () => {
    it('should calculate string length in five character', () => {
      expect(helpFuncs.generateId(-5)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{5}$/));
    });
  });

  describe('with too much positive argument', () => {
    it('should calculate string length in twenty character', () => {
      expect(helpFuncs.generateId(500000)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{20}$/));
    });
  });

  describe('with too much negative argument', () => {
    it('should calculate string length in twenty character', () => {
      expect(helpFuncs.generateId(-500000)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{20}$/));
    });
  });

  describe('when argument is a string', () => {
    it('should calculate string length in five character', () => {
      expect(helpFuncs.generateId('5')).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{5}$/));
    });
  });

  describe('when argument is equal zero', () => {
    it('should calculate string length in one character', () => {
      expect(helpFuncs.generateId(0)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{1}$/));
    });
  });

  describe('when argument is null', () => {
    it('should calculate string length in four character', () => {
      expect(helpFuncs.generateId(null)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{4}$/));
    });
  });

  describe('when argument is undefined', () => {
    it('should calculate string length in four character', () => {
      expect(helpFuncs.generateId(undefined)).toEqual(jasmine.stringMatching(/^[a-zA-Z0-9]{4}$/));
    });
  });

});
