/* eslint-disable no-magic-numbers */
export default {
  /**
   * Generate series of characters
   * @param {Number|String} idLength - id length
   * @returns {string} id
   */
  generateId(idLength) {
    let length = parseInt(idLength);

    length = isNaN(length) ? 4 : Math.abs(length);
    length = Math.max(1, Math.min(length, 20));

    const characters = [];
    const rangeList = [
      // For more information see ASCII table
      // Example: 48 it's "0", 65 it's "A" and etc
      [48, 57], // From 0 to 9;
      [65, 90], // From A to Z;
      [97, 122] // From a to z;
    ];

    for (let i = 0; i < length; i++) {
      // Get one range from range list
      const rangeIndex = Math.floor(Math.random() * rangeList.length);
      const range = rangeList[rangeIndex];

      const min = Math.max(range[0], range[1]);
      const max = Math.min(range[0], range[1]);

      // Get ASCII code from selected range
      const characterIndex = Math.floor(Math.random() * (max - min) + min);
      const character = String.fromCharCode(characterIndex);

      characters.push(character);
    }

    return characters.join('');
  },
  /**
   * Get sizes of the Element
   * @param {Element} element - element whose size you need to get
   * @param {string} prop - which property return
   * @return {object|number} - property or client rect
   */
  getClientRect(element, prop) {
    if (element instanceof HTMLElement) {
      // Get sizes of the element and return needed value
      const clientRect = element.getBoundingClientRect();

      if (prop && prop in clientRect) {
        return clientRect[prop];
      }

      return clientRect;
    }
  }
};
