'use strict';

export default {

  /**
   * This function here just to demonstrate test case
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  sum: function (a, b) {
    return a + b;
  },
  /**
   * Output type of input object ("extends" native typeof)
   * @param {Object|Function|Array|Number|RegExp|String|Boolean|Null|Undefined} object
   * @returns {string}
   */
  getType: function(object){
    let str;

    str = Object.prototype.toString.call(object); // transform object to string
    str = str.slice(8, str.length - 1); // cut needed part. for example "[object (Object)]"
    str = str.toLowerCase();

    // if it's html element - return "html" type
    str = (str.indexOf("html") !== -1) ? "html" : str;

    return str;
  },
  /**
   * Extended objects
   * @param {Object} target
   * @params {Object} sources
   * @return {Object} return extended object
   * @private
   */
  extend: function(target){
    target = (this.getType(target) === "object") ? target : {};

    let sources = Array.prototype.slice.call(arguments, 1);
    let length = sources.length;

    if(length){
      let key, source, i = 0;

      for(; i < length; i++){
        source = sources[i];
        source = (this.getType(source) === 'object') ? source : {};

        for(key in source){
          target[key] = source[key];
        }
      }

      return target;
    }
  }
};