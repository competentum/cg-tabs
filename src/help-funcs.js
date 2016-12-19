'use strict';

export default {
  /**
   * Generate series of characters
   * @param {Number|String} [length] - id length
   * @returns {string}
   */
  generateId: function(length){
    length = isNaN(length) ? 4 : Math.abs(length);
    length = Math.max(1, Math.min(length, 20));

    let characters = [];
    let rangeList = [
      // for more information see ASCII table
      // example: 48 it's "0", 65 it's "A" and etc
      [48, 57], // from 0 to 9;
      [65, 90], // from A to Z;
      [97, 122] // from a to z;
    ];

    let characterIndex;
    let rangeIndex;
    let character;
    let range;
    let max;
    let min;

    for(let i = 0; i < length; i++){
      // get one range from range list
      rangeIndex = Math.floor(Math.random() * rangeList.length);
      range = rangeList[rangeIndex];

      min = Math.max(range[0], range[1]);
      max = Math.min(range[0], range[1]);

      // get ASCII code from selected range
      characterIndex = Math.floor(Math.random() * (max - min) + min);
      character = String.fromCharCode(characterIndex);

      characters.push(character);
    }

    return characters.join('');
  }
};